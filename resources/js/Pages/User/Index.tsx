import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { format } from "date-fns";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "@/Components/Pagination";
import { useTranslation } from "react-i18next";
import TextInput from "@/Components/TextInput";
import type { User, IndexProps } from "../../types/types";

const Index: React.FC<IndexProps> = ({
  auth,
  users,
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

    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user: User): void => {
    if (!window.confirm('Вы хотите удалить пользователя?')) {

    }

    router.delete(route('user.destroy', user.id));
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

  const toBanned = (user: User) => {
    router.post(route("user.toBanned", user.id));
  }

  const toActive = (user: User) => {
    router.post(route("user.toActive", user.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="d-flex justify-between">
          <h2
            className="font-semibold text-xl text-gray-800
          dark:text-gray-200 leading-tight"
          >
            {t("user.header")}
          </h2>
          <Link href={route("user.create")} className="btn btn-primary">
            {t("create.user")}
          </Link>
        </div>
      }
    >
      <Head title="Пользователи" />
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
                    <th>{t("user.id")}</th>
                    <th>{t("user.image")}</th>
                    <th>{t("user.name")}</th>
                    <th>{t("user.email")}</th>
                    <th>{t("user.created_at")}</th>
                    <th>{t("user.actions")}</th>
                    <th>{t("user.state")}</th>
                  </tr>
                </thead>
                <thead className="fs-4">
                  <tr>
                    <th></th>
                    <th></th>
                    <th>
                      <TextInput
                        className="w-full"
                        placeholder="Имя пользователя"
                        defaultValue={queryParams.name}
                        onBlur={(e) =>
                          searchFieldChanged("name", e.target.value)
                        }
                        onKeyDown={(e) => onKeyPress("name", e)}
                      />
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="fs-5">
                  {users.data.map((user: User) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        {user.image !== '' && (
                          <img
                            src={`/storage/${user.image}`}
                            alt=""
                            style={{ 
                              width: "200px",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                      </td>
                      <td>
                        <Link
                          href={route("user.show", user.id)}
                          className="hover:underline text-black"
                        >
                          {user.name}
                        </Link>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        {user.created_at ? format(new Date(user.created_at), "yyyy-MM-dd") : ''}
                      </td>
                      <td>
                        <div className="d-flex flex-column justify-content-center">
                          <Link
                            href={route("user.edit", user.id)}
                            className="btn btn-primary mb-2 btn-sm"
                            style={{ width: "100px" }}
                          >
                            {t("buttons.edit")}
                          </Link>
                          <button
                            onClick={(e) => deleteUser(user)}
                            className="btn btn-danger btn-sm"
                            style={{ width: "100px" }}
                          >
                            {t("buttons.delete")}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column justify-content-center">
                        {user.state === "App\\States\\Active" ? (
                            <button
                              className="mx-2 btn btn-danger"
                              onClick={() => toBanned(user)}
                            >
                              {t('buttons.toBanned')}
                            </button>
                          ) : (
                            <button
                              className="mx-2 btn btn-success"
                              onClick={() => toActive(user)}
                            >
                              {t('buttons.toActive')}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <Pagination links={users.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
