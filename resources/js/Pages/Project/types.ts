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
  projects: {
    meta: any;
    id: number;
    name: string;
    description: string;
    created_at: Date;
    due_date: Date;
    status: string;
    image_path: string;
    createdBy: string;
    updatedBy: string;
  };
  tasks: {
    meta: any;
    id: number;
    name: string;
    description: string;
    created_at: Date;
    due_date: Date;
    status: string;
    image_path: string;
    createdBy: string;
    updatedBy: string;
  }
}

interface Project {
  data: any;
  id: number;
  name: string;
  description: string;
  created_at: Date;
  due_date: Date;
  status: string;
  image_path: string;
  createdBy: string;
  updatedBy: string;
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
  createdBy: string;
  updatedBy: string;
}

interface IndexProps {
  auth: Auth;
  projects: Auth;
  project: Project;
  tasks: Auth;
  task: Task;
}

export type { Auth, Project, Task, IndexProps };
