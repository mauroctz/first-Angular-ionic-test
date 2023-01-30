export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiData {
  data: User[];
  total_pages: number;
  page: number;
}
