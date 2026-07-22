import { supabase } from '../lib/supabase';

// =====================================
// Cast a vote on an issue (idempotent — safe to call if already voted)
// The DB trigger will increment issue.votes and award points automatically.
// =====================================
export async function castVote(issueId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('votes')
    .insert({ issue_id: issueId, user_id: userId });

  if (error) {
    // Unique constraint violation means already voted — treat as a no-op
    if (error.code === '23505') {
      console.info('[voteService] User already voted on this issue.');
      return;
    }
    console.error('[voteService] castVote error:', error.message);
    throw new Error(error.message);
  }
}

// =====================================
// Remove a vote (un-vote)
// The DB trigger will decrement issue.votes and remove points automatically.
// =====================================
export async function removeVote(issueId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('votes')
    .delete()
    .eq('issue_id', issueId)
    .eq('user_id', userId);

  if (error) {
    console.error('[voteService] removeVote error:', error.message);
    throw new Error(error.message);
  }
}

// =====================================
// Get all issue IDs that a user has voted on
// Used to highlight already-voted issues in the UI
// =====================================
export async function getUserVotedIssueIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('votes')
    .select('issue_id')
    .eq('user_id', userId);

  if (error) {
    console.error('[voteService] getUserVotedIssueIds error:', error.message);
    return [];
  }

  return (data ?? []).map((v) => v.issue_id);
}

// =====================================
// Toggle a vote: cast if not voted, remove if already voted
// Returns true if vote was cast, false if vote was removed
// =====================================
export async function toggleVote(
  issueId: string,
  userId: string,
  currentlyVoted: boolean
): Promise<boolean> {
  if (currentlyVoted) {
    await removeVote(issueId, userId);
    return false;
  } else {
    await castVote(issueId, userId);
    return true;
  }
}
