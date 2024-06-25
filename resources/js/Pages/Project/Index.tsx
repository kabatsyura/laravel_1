import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

interface Auth {
  user: {
    // Определите свойства пользователя, которые вам нужны
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
  },
  projects: {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    due_date: Date;
    status: string;
    image_path: string;
    createdBy: boolean;
    updatedBy: boolean;
  }
}

interface IndexProps {
  auth: Auth;
  projects: Auth;
}

const Index: React.FC<IndexProps> = ({ auth, projects }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800
        dark:text-gray-200 leading-tight">
          Проект
        </h2>
      }
    >
      <Head title="Проекты" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <pre>{JSON.stringify(projects, undefined, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;