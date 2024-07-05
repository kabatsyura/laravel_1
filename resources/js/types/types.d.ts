// types.ts
interface Auth {
  data: any;
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    data: Object;
  };
}

interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

interface Meta {
  links: PaginationLinks[];
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface Project {
  data?: any;
  id?: number;
  image: File | undefined;
  name: string;
  description: string;
  created_at?: Date;
  due_date: Date;
  status: string;
  image_path: string;
  createdBy?: {
    id: number;
    name: string;
    email: string;
    created_at: Date;
  };
  updatedBy?: {
    id: number;
    name: string;
    email: string;
    created_at: Date;
  };
}

interface Projects {
  data: Project[];
  meta: Meta; // Добавлено поле meta
}

interface Task {
  data: any;
  id: number;
  name: string;
  description: string;
  created_at: Date;
  due_date: Date;
  status: string;
  image_path: string;
  project: {
    name: string;
  };
  createdBy: {
    name: string;
  };
  updatedBy: {
    name: string;
  };
}

interface Tasks {
  data: Task[];
  meta: Meta; // Добавлено поле meta
}

interface User {
  id?: number;
  data?: any;
  image: string | null;
  name: string;
  email: string;
  created_at?: string;
  password: string;
  password_confirmation: string;
  state: 'Active' | 'Banned';
}

interface Users {
  data: User[];
  meta: Meta;
}

interface IndexProps {
  auth: Auth;
  projects: Projects;
  project: Project;
  tasks: Tasks;
  task: Task;
  users: Users;
  user: User;
  success: string;
  queryParams: any;
}

export type { Auth, Project, Task, IndexProps, User };
