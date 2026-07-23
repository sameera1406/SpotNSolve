import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import type { Report, Category, LeaderboardEntry, IssueStatus } from '../types';
import { fetchIssues, createIssue, updateIssueStatus } from '../services/issueService';
import { fetchCategories } from '../services/categoryService';
import { castVote, removeVote, getUserVotedIssueIds } from '../services/voteService';
import { fetchLeaderboard } from '../services/profileService';
import { useAuth } from './AuthContext';

// =====================================
// Context interface
// =====================================
interface DataContextType {
  reports: Report[];
  categories: Category[];
  loadingReports: boolean;
  loadingCategories: boolean;
  /** IDs of issues the current user has already voted on */
  votedIssueIds: Set<string>;
  addReport: (
    payload: Omit<Report, 'id' | 'createdAt' | 'votes' | 'username' | 'imageUrl'> & {
      imageFile?: File | null;
    }
  ) => Promise<void>;
  updateReportStatus: (id: string, status: IssueStatus) => Promise<void>;
  voteOnPoll: (reportId: string, userId: string) => Promise<void>;
  getLeaderboard: () => Promise<LeaderboardEntry[]>;
  refreshReports: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { user } = useAuth();

  const [reports, setReports] = useState<Report[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [votedIssueIds, setVotedIssueIds] = useState<Set<string>>(new Set());
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // -----------------------------------------------------------------------
  // Load categories once on mount (public — no auth required)
  // -----------------------------------------------------------------------
  useEffect(() => {
    setLoadingCategories(true);
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error('[DataContext] fetchCategories:', err))
      .finally(() => setLoadingCategories(false));
  }, []);

  // -----------------------------------------------------------------------
  // Load issues whenever auth state changes
  // -----------------------------------------------------------------------
  const loadReports = useCallback(async () => {
    setLoadingReports(true);
    try {
      const data = await fetchIssues();
      setReports(data);
    } catch (err) {
      console.error('[DataContext] fetchIssues:', err);
    } finally {
      setLoadingReports(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  // -----------------------------------------------------------------------
  // Load the set of issue IDs the current user has voted on
  // -----------------------------------------------------------------------
  useEffect(() => {
    if (!user) {
      setVotedIssueIds(new Set());
      return;
    }

    getUserVotedIssueIds(user.id)
      .then((ids) => setVotedIssueIds(new Set(ids)))
      .catch((err) => console.error('[DataContext] getUserVotedIssueIds:', err));
  }, [user]);

  // -----------------------------------------------------------------------
  // addReport: create a new issue via issueService
  // -----------------------------------------------------------------------
  const addReport = useCallback(
    async (
      payload: Omit<Report, 'id' | 'createdAt' | 'votes' | 'username' | 'imageUrl'> & {
        imageFile?: File | null;
      }
    ) => {
      if (!user) throw new Error('User not authenticated');

      const { imageFile, ...rest } = payload;

      console.log('[DataContext] Creating report...', rest.title);
      const newReport = await createIssue({
        title: rest.title,
        description: rest.description,
        location: rest.location,
        categoryId: rest.categoryId,
        userId: rest.userId,
        imageFile: imageFile ?? null,
      });

      console.log('[DataContext] New report created, updating local state immediately:', newReport.id);
      setReports((prev) => [newReport, ...prev.filter((r) => r.id !== newReport.id)]);

      // Refresh the reports list from backend as well
      await loadReports();
    },
    [user, loadReports]
  );

  // -----------------------------------------------------------------------
  // updateReportStatus: admin changes status via issueService
  // -----------------------------------------------------------------------
  const updateReportStatus = useCallback(
    async (id: string, status: IssueStatus) => {
      await updateIssueStatus(id, status);

      // Optimistic update in local state
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    },
    []
  );

  // -----------------------------------------------------------------------
  // voteOnPoll: toggle vote via voteService
  // -----------------------------------------------------------------------
  const voteOnPoll = useCallback(
    async (reportId: string, userId: string) => {
      const alreadyVoted = votedIssueIds.has(reportId);

      if (alreadyVoted) {
        await removeVote(reportId, userId);
        setVotedIssueIds((prev) => {
          const next = new Set(prev);
          next.delete(reportId);
          return next;
        });
        // Optimistic decrement
        setReports((prev) =>
          prev.map((r) =>
            r.id === reportId ? { ...r, votes: Math.max(0, r.votes - 1) } : r
          )
        );
      } else {
        await castVote(reportId, userId);
        setVotedIssueIds((prev) => new Set(prev).add(reportId));
        // Optimistic increment
        setReports((prev) =>
          prev.map((r) =>
            r.id === reportId ? { ...r, votes: r.votes + 1 } : r
          )
        );
      }
    },
    [votedIssueIds]
  );

  // -----------------------------------------------------------------------
  // getLeaderboard: fetch from profileService
  // -----------------------------------------------------------------------
  const getLeaderboard = useCallback(async (): Promise<LeaderboardEntry[]> => {
    return fetchLeaderboard();
  }, []);

  // -----------------------------------------------------------------------
  // Public refresh trigger
  // -----------------------------------------------------------------------
  const refreshReports = useCallback(async () => {
    await loadReports();
  }, [loadReports]);

  return (
    <DataContext.Provider
      value={{
        reports,
        categories,
        loadingReports,
        loadingCategories,
        votedIssueIds,
        addReport,
        updateReportStatus,
        voteOnPoll,
        getLeaderboard,
        refreshReports,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};