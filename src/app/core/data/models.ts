export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  active?: boolean;
}

export interface Task {
  uid: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  assignee: User | null;
}
