import { supabase } from '../lib/supabase';
import type { Issue, Report, IssueStatus } from '../types';

// =====================================
// Helper: map a raw DB issue row to the UI Report type
// =====================================
export function mapIssueToReport(issue: Issue): Report {
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    location: issue.location ?? '',
    imageUrl: issue.image_url,
    status: issue.status,
    priority: issue.priority,
    userId: issue.user_id,
    username: issue.profiles?.username ?? 'Unknown',
    votes: issue.votes,
    createdAt: new Date(issue.created_at),
    category: issue.categories?.name ?? null,
    categoryId: issue.category_id,
  };
}

// =====================================
// Fetch all issues with profile and category joins
// =====================================
export async function fetchIssues(): Promise<Report[]> {
  const { data, error } = await supabase
    .from('issues')
    .select(`
      *,
      profiles ( username, points ),
      categories ( name )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[issueService] fetchIssues error:', error.message);
    throw new Error(error.message);
  }

  return (data ?? []).map(mapIssueToReport);
}

// =====================================
// Fetch issues for a specific user
// =====================================
export async function fetchUserIssues(userId: string): Promise<Report[]> {
  const { data, error } = await supabase
    .from('issues')
    .select(`
      *,
      profiles ( username, points ),
      categories ( name )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[issueService] fetchUserIssues error:', error.message);
    throw new Error(error.message);
  }

  return (data ?? []).map(mapIssueToReport);
}

// =====================================
// Fetch a single issue by ID
// =====================================
export async function fetchIssueById(id: string): Promise<Report | null> {
  const { data, error } = await supabase
    .from('issues')
    .select(`
      *,
      profiles ( username, points ),
      categories ( name )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('[issueService] fetchIssueById error:', error.message);
    return null;
  }

  return data ? mapIssueToReport(data) : null;
}

// =====================================
// Create a new issue (with optional image upload)
// =====================================
export interface CreateIssuePayload {
  title: string;
  description: string;
  location: string;
  categoryId: number | null;
  userId: string;
  imageFile?: File | null;
  latitude?: number | null;
  longitude?: number | null;
}

export async function createIssue(payload: CreateIssuePayload): Promise<Report> {
  let imageUrl: string | null = null;

  // Upload image if provided
  if (payload.imageFile) {
    const fileExt = payload.imageFile.name.split('.').pop();
    const fileName = `${payload.userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('issue-images')
      .upload(fileName, payload.imageFile, { upsert: false });

    if (uploadError) {
      console.error('[issueService] image upload error:', uploadError.message);
      // Non-fatal — proceed without image
    } else {
      const { data: urlData } = supabase.storage
        .from('issue-images')
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }
  }

  const { data, error } = await supabase
    .from('issues')
    .insert({
      user_id: payload.userId,
      category_id: payload.categoryId,
      title: payload.title,
      description: payload.description,
      location: payload.location,
      image_url: imageUrl,
      latitude: payload.latitude ?? null,
      longitude: payload.longitude ?? null,
      status: 'Pending' as IssueStatus,
      priority: 'Medium',
      votes: 0,
    })
    .select(`
      *,
      profiles ( username, points ),
      categories ( name )
    `)
    .single();

  if (error) {
    console.error('[issueService] createIssue error:', error.message);
    throw new Error(error.message);
  }

  return mapIssueToReport(data);
}

// =====================================
// Update issue status (admin action)
// =====================================
export async function updateIssueStatus(
  issueId: string,
  status: IssueStatus
): Promise<void> {
  const { error } = await supabase
    .from('issues')
    .update({ status })
    .eq('id', issueId);

  if (error) {
    console.error('[issueService] updateIssueStatus error:', error.message);
    throw new Error(error.message);
  }
}

// =====================================
// Fetch aggregate stats
// =====================================
export interface IssueStats {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  rejected: number;
}

export async function fetchStats(): Promise<IssueStats> {
  const { data, error } = await supabase
    .from('issues')
    .select('status');

  if (error) {
    console.error('[issueService] fetchStats error:', error.message);
    throw new Error(error.message);
  }

  const rows = data ?? [];
  return {
    total: rows.length,
    pending: rows.filter((r) => r.status === 'Pending').length,
    inProgress: rows.filter((r) => r.status === 'In Progress').length,
    resolved: rows.filter((r) => r.status === 'Resolved').length,
    rejected: rows.filter((r) => r.status === 'Rejected').length,
  };
}
