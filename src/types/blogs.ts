export interface TBlog {
  id: string;
  title: string;
  overview: string;
  image: string;
  content: string;
  tags: string[];
  is_public: boolean;
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: Author;
}
export interface Author {
  id: string;
  name: string;
  profilePhoto: string;
}
