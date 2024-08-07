import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import type { IndexProps } from "../../types/types";
import { Head } from "@inertiajs/react";

const Show: React.FC<IndexProps>  = ({ auth, user }: IndexProps): any => {
  const { t } = useTranslation();
  const data = user.data;

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2
          className="font-semibold text-xl text-gray-800
        dark:text-gray-200 leading-tight"
        >
          {t("user.header")}
        </h2>
      }
    >
      <Head title={`Проект: ${data.id}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={data.image}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="container p-3 m-3">
              <div className="row mt-2 fs-3">
                <p><span className="fw-bold">{t("user.name")}:</span> {data.name}</p>
              </div>
              <div className="row mt-2 fs-5">
                <p><span className="fw-bold">{t("user.description")}:</span> {data.description}</p>
              </div>
              <div className="row mt-2 fs-5">
                <div className="col"><span className="fw-bold">{t("user.created_at")}</span>: {data.created_at}</div>
                <div className="col"><span className="fw-bold">{t("user.createdBy.name")}</span>: {data.createdBy.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
