import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { format } from 'date-fns';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "@/Components/Pagination";
import { useTranslation } from 'react-i18next';
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

interface Auth {
  data: any;
  user: {
    // Определите свойства пользователя, которые вам нужны
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    data: Object;
  },
  tasks: {
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
}

interface Task {
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
  tasks: Auth;
}

const Index: React.FC<IndexProps> = ({ auth, tasks, queryParams = null }): any => {
  queryParams = queryParams || {};
  const { t } = useTranslation();

  const searchFieldChanged = (name: string, value: string): void => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  }

  const onKeyPress = (name: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return null;
    }
    const target = e.target as HTMLInputElement;
    searchFieldChanged(name, target.value);
  }
  
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800
        dark:text-gray-200 leading-tight">
          {t("task.header")}
        </h2>
      }
    >
      <Head title="Проекты" />
      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
              <table className="table table-striped">
                <thead className="fs-4">
                  <tr>
                    <th>{t("task.id")}</th>
                    <th>{t("task.image")}</th>
                    <th>{t("task.name")}</th>
                    <th>{t("task.status")}</th>
                    <th>{t("task.created_at")}</th>
                    <th>{t("task.due_date")}</th>
                    <th>{t("task.createdBy.name")}</th>
                    <th>{t("task.actions")}</th>
                  </tr>
                </thead>
                <thead className="fs-4">
                  <tr>
                    <th></th>
                    <th></th>
                    <th>
                      <TextInput className="w-full" placeholder="Название проекта"
                        defaultValue={queryParams.name}
                        onBlur={(e) => searchFieldChanged('name', e.target.value)}
                        onKeyDown={(e) => onKeyPress('name', e)}
                      />
                    </th>
                    <th className="col-2">
                      <SelectInput className="w-full"
                        defaultValue={queryParams.status}
                        onChange={(e) => searchFieldChanged('status', e.target.value)}>
                        <option value="">{t("task.taskStatus.nothing")}</option>
                        <option value={t("task.taskStatus.pending")}>{t("task.taskStatus.pending")}</option>
                        <option value={t("task.taskStatus.in_progress")}>{t("task.taskStatus.in_progress")}</option>
                        <option value={t("task.taskStatus.completed")}>{t("task.taskStatus.completed")}</option>
                      </SelectInput>
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="fs-5">
                  {tasks.data.map((task: Task) => (
                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>
                        <img src={task.image_path} alt="" style={{ width: '200px' }}/>
                      </td>
                      <td>{task.name}</td>
                      <td>{task.status}</td>
                      <td>{format(new Date(task.created_at), 'yyyy-MM-dd')}</td>
                      <td>{format(new Date(task.due_date), 'yyyy-MM-dd')}</td>
                      <td>{task.createdBy.name}</td>
                      <td>
                        <div className="d-flex flex-column justify-content-center">
                          <Link href={route("task.edit", task.id)} className="btn btn-primary mb-2 btn-sm" 
                            style={{ width: '100px' }}>
                              Изменить
                            </Link>
                          <Link href={route("task.edit", task.id)} className="btn btn-danger btn-sm"
                            style={{ width: '100px' }}>
                              Удалить
                            </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <Pagination links={tasks.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
