import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { format } from "date-fns";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "@/Components/Pagination";
import { useTranslation } from "react-i18next";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import type { Project, IndexProps } from "../Utils/types";

const Index: React.FC<IndexProps> = ({
  auth,
  projects,
  queryParams = null,
  success
}: IndexProps): any => {
  queryParams = queryParams || {};
  const { t } = useTranslation();

  const searchFieldChanged = (name: string, value: string): void => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (project: IndexProps): void => {
    if (!window.confirm('Вы хотите удалить проект?')) {

    }

    router.delete(route('project.destroy', project.id));
  }

  const onKeyPress = (
    name: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== "Enter") {
      return null;
    }
    const target = e.target as HTMLInputElement;
    searchFieldChanged(name, target.value);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="d-flex justify-between">
          <h2
            className="font-semibold text-xl text-gray-800
          dark:text-gray-200 leading-tight"
          >
            {t("project.header")}
          </h2>
          <Link href={route("project.create")} className="btn btn-primary">
            {t("create")}
          </Link>
        </div>
      }
    >
      <Head title="Проекты" />

      {/* вывод когда проект создан */}
      {success && (
        <div 
        className="mx-auto py-2 px-4 mt-4 col-4 rounded bg-emerald-500 text-align-center">
          {success}
        </div>
      )}

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
              <table className="table table-striped">
                <thead className="fs-4">
                  <tr>
                    <th>{t("project.id")}</th>
                    <th>{t("project.image")}</th>
                    <th>{t("project.name")}</th>
                    <th>{t("project.status")}</th>
                    <th>{t("project.created_at")}</th>
                    <th>{t("project.due_date")}</th>
                    <th>{t("project.createdBy.name")}</th>
                    <th>{t("project.actions")}</th>
                  </tr>
                </thead>
                <thead className="fs-4">
                  <tr>
                    <th></th>
                    <th></th>
                    <th>
                      <TextInput
                        className="w-full"
                        placeholder="Название проекта"
                        defaultValue={queryParams.name}
                        onBlur={(e) =>
                          searchFieldChanged("name", e.target.value)
                        }
                        onKeyDown={(e) => onKeyPress("name", e)}
                      />
                    </th>
                    <th className="col-2">
                      <SelectInput
                        className="w-full"
                        defaultValue={queryParams.status}
                        onChange={(e) =>
                          searchFieldChanged("status", e.target.value)
                        }
                      >
                        <option value="">
                          {t("project.projectStatus.nothing")}
                        </option>
                        <option value={t("project.projectStatus.pending")}>
                          {t("project.projectStatus.pending")}
                        </option>
                        <option value={t("project.projectStatus.in_progress")}>
                          {t("project.projectStatus.in_progress")}
                        </option>
                        <option value={t("project.projectStatus.completed")}>
                          {t("project.projectStatus.completed")}
                        </option>
                      </SelectInput>
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="fs-5">
                  {projects.data.map((project: Project) => (
                    <tr key={project.id}>
                      <td>{project.id}</td>
                      <td>
                        <img
                          src={project.image_path}
                          alt=""
                          style={{ width: "200px" }}
                        />
                      </td>
                      <td>
                        <Link
                          href={route("project.show", project.id)}
                          className="hover:underline text-black"
                        >
                          {project.name}
                        </Link>
                      </td>
                      <td>{project.status}</td>
                      <td>
                        {format(new Date(project.created_at), "yyyy-MM-dd")}
                      </td>
                      <td>
                        {format(new Date(project.due_date), "yyyy-MM-dd")}
                      </td>
                      <td>{project.createdBy.name}</td>
                      <td>
                        <div className="d-flex flex-column justify-content-center">
                          <Link
                            href={route("project.edit", project.id)}
                            className="btn btn-primary mb-2 btn-sm"
                            style={{ width: "100px" }}
                          >
                            {t("buttons.edit")}
                          </Link>
                          <button
                            onClick={(e) => deleteProject(project)}
                            className="btn btn-danger btn-sm"
                            style={{ width: "100px" }}
                          >
                            {t("buttons.delete")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <Pagination links={projects.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
