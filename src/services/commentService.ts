import { supabase } from '../lib/supabase';
import type { Comment } from '../types';

// =====================================
// Fetch all comments for an issue
// =====================================
export async function fetchComments(issueId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      profiles ( username )
    `)
    .eq('issue_id', issueId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[commentService] fetchComments error:', error.message);
    throw new Error(error.message);
  }

  return data ?? [];
}

// =====================================
// Add a new comment to an issue
// =====================================
export async function addComment(
  issueId: string,
  userId: string,
  text: string
): Promise<Comment> {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      issue_id: issueId,
      user_id: userId,
      comment: text,
    })
    .select(`
      *,
      profiles ( username )
    `)
    .single();

  if (error) {
    console.error('[commentService] addComment error:', error.message);
    throw new Error(error.message);
  }

  return data;
}

// =====================================
// Delete a comment
// =====================================
export async function deleteComment(commentId: string): Promise<void> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    console.error('[commentService] deleteComment error:', error.message);
    throw new Error(error.message);
  }
}
