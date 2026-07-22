// =====================================
// DATABASE-LEVEL TYPES (match Supabase schema exactly)
// =====================================

export type IssueStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
export type IssuePriority = 'Low' | 'Medium' | 'High';
export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  username: string;
  role: UserRole;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Issue {
  id: string;
  user_id: string;
  category_id: number | null;
  title: string;
  description: string;
  image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  location: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  votes: number;
  created_at: string;
  updated_at: string;
  // Joined fields
  profiles?: Pick<Profile, 'username' | 'points'>;
  categories?: Pick<Category, 'name'>;
}

export interface Comment {
  id: string;
  issue_id: string;
  user_id: string;
  comment: string;
  created_at: string;
  // Joined fields
  profiles?: Pick<Profile, 'username'>;
}

export interface Vote {
  id: string;
  issue_id: string;
  user_id: string;
  created_at: string;
}

// =====================================
// UI-LEVEL TYPES (used by pages and DataContext)
// =====================================

/**
 * UI-friendly representation of an issue.
 * Maps DB snake_case fields to camelCase and normalises status labels.
 */
export interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  userId: string;
  username: string;
  votes: number;
  createdAt: Date;
  category: string | null;
  categoryId: number | null;
}

export interface LeaderboardEntry {
  username: string;
  points: number;
  reports: number;
}

// Legacy types kept for backward compat with GamificationPage badges array
export interface Poll {
  id: string;
  reportId: string;
  votes: number;
  voters: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: unknown | null;
  profile: Profile | null;
  role: UserRole | null;
}