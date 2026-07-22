import { supabase } from '../lib/supabase';
import type { Profile, LeaderboardEntry } from '../types';

// =====================================
// Fetch a single user profile by ID
// =====================================
export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('[profileService] fetchProfile error:', error.message);
    return null;
  }

  return data;
}

// =====================================
// Fetch leaderboard: top profiles ordered by points
// Also includes a count of issues submitted per user
// =====================================
export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  // Fetch all profiles with points
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('id, username, points')
    .order('points', { ascending: false })
    .limit(20);

  if (profileError) {
    console.error('[profileService] fetchLeaderboard profiles error:', profileError.message);
    throw new Error(profileError.message);
  }

  if (!profiles || profiles.length === 0) return [];

  // Fetch issue counts per user
  const { data: issueCounts, error: countError } = await supabase
    .from('issues')
    .select('user_id');

  if (countError) {
    console.error('[profileService] fetchLeaderboard issue counts error:', countError.message);
    // Return partial data without report counts
    return profiles.map((p) => ({
      username: p.username,
      points: p.points,
      reports: 0,
    }));
  }

  // Build a count map
  const countMap: Record<string, number> = {};
  for (const row of issueCounts ?? []) {
    countMap[row.user_id] = (countMap[row.user_id] ?? 0) + 1;
  }

  return profiles.map((p) => ({
    username: p.username,
    points: p.points,
    reports: countMap[p.id] ?? 0,
  }));
}

// =====================================
// Update a user's profile (e.g. username)
// =====================================
export async function updateProfile(
  userId: string,
  updates: Partial<Pick<Profile, 'username'>>
): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) {
    console.error('[profileService] updateProfile error:', error.message);
    throw new Error(error.message);
  }
}
