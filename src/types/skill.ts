export interface TSkill {
  id?: string;
  name?: string;
  level?: string;
  icon?: string;
  isDeleted?: boolean;
  isNew?: boolean;
  heroSection?: boolean;
  is_public?: boolean;
  skillCount?: number;
  projectCount?: number;
  blogCount?: number;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}
