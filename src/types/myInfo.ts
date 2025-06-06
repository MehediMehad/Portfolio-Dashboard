export interface TMyInfo {
  id: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  role: string;
  email: string;
  password: string;
  aboutMe: string;
  designation: string;
  projectCount: number;
  blogCount: number;
  skillCount: number;
  socialMediaLinks: string[];
  gender: string;
  needPasswordChange: boolean;
  address: string;
  createdAt: string;
  updatedAt: string;
  skills?: {
    id: string;
    name: string;
    level: string;
    icon: string;
  }[];
  socialLinks?: {
    id: string;
    platform: string;
    url: string;
    icon: string;
  }[];
}
