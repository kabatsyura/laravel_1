// @ts-nocheck
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
// import React from "react";
// import { format } from 'date-fns';

const Index = ({ auth, projects }) => {
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
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Изображение</th>
                    <th>Название задачи</th>
                    <th>Статус</th>
                    <th>Дата создания</th>
                    <th>Срок выполнения</th>
                    <th>Создано кем</th>
                    <th>Задачи</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.data.map((project) => (
                    <tr key={project.id}>
                      <td>{project.id}</td>
                      <td>
                        <img src={project.image_path} alt="" />
                      </td>
                      <td>{project.name}</td>
                      <td>{project.status}</td>
                      <td>{project.created_at}</td>
                      <td>{project.due_date}</td>
                      <td>{project.createdBy.name}</td>
                      <td>
                        <Link href={route("project.edit", project.id)}>Изменить</Link>
                        <Link href={route("project.edit", project.id)}>Удалить</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

// interface Auth {
//   data: any;
//   user: {
//     // Определите свойства пользователя, которые вам нужны
//     id: number;
//     name: string;
//     email: string;
//     email_verified_at: string;
//     data: Object;
//   },
//   projects: Project[];
// }

// interface Project {
//   id: number;
//   name: string;
//   description: string;
//   created_at: Date;
//   due_date: Date;
//   status: string;
//   image_path: string;
//   createdBy: string;
//   updatedBy: string;
// }

// interface IndexProps {
//   auth: Auth;
//   projects: Auth;
// }

// const Index: React.FC<IndexProps> = ({ auth, projects }) => {
//   return (
//     <AuthenticatedLayout
//       user={auth.user}
//       header={
//         <h2 className="font-semibold text-xl text-gray-800
//         dark:text-gray-200 leading-tight">
//           Проект
//         </h2>
//       }
//     >
//       <Head title="Проекты" />
//       <div className="py-12">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//           <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//             <div className="p-6 text-gray-900 dark:text-gray-100">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Изображение</th>
//                     <th>Название задачи</th>
//                     <th>Статус</th>
//                     <th>Дата создания</th>
//                     <th>Срок выполнения</th>
//                     <th>Создано кем</th>
//                     <th>Задачи</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {projects.data.map((project: Project) => (
//                     <tr>
//                       <td>{project.id}</td>
//                       <td>
//                         <img src={project.image_path} alt="" />
//                       </td>
//                       <td>{project.name}</td>
//                       <td>{project.status}</td>
//                       <td>{format(new Date(project.created_at), 'yyyy-MM-dd')}</td>
//                       <td>{format(new Date(project.due_date), 'yyyy-MM-dd')}</td>
//                       <td>{project.createdBy.name}</td>
//                       <td>
//                         <Link href={route("project.edit", project.id)}>Изменить</Link>
//                         <Link href={route("project.edit", project.id)}>Удалить</Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// }

export default Index;