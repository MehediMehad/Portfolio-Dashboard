export interface TProject {
  id: string;
  projectImage: string;
  title: string;
  overview: string;
  description: string;
  date_time: string;
  techStack: string[];
  features: string[];
  whatILearned: string[];
  futureImprovements: string[];
  liveURL: string;
  gitHubURL: string;
  is_public: boolean;
  heroSection: boolean;
  isDeleted: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}
