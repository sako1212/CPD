export interface Post {
  _id: string;
  user: any;
  content: string;
  createdAt: string;
  comments: Array<any>;
  likes: Array<any>;
}
