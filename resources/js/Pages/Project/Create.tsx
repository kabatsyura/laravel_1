import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { useTranslation } from "react-i18next";
import { Head, useForm } from "@inertiajs/react";
import type { Project, IndexProps } from "../Utils/types";
import { Form, Col, Row, Container, Button } from 'react-bootstrap';

const Create: React.FC<IndexProps> = ({ auth }: IndexProps): any => {
  const { t } = useTranslation();
  const { data, setData, post, errors, reset } = useForm<Project>({
    image_path: '',
    name: '',
    status: '',
    description: '',
    due_date: new Date(),
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('project.create'));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="d-flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
          >
            {t("create")}
          </h2>
        </div>
      }
    >
      <Container>
        <Head title="Проекты" />
        <Row>
          <Col>
            <Form onSubmit={onSubmit}>

            </Form>
          </Col>
        </Row>
      </Container>
    </AuthenticatedLayout>
  )
}

export default Create;
