import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import { Head, Link, useForm } from "@inertiajs/react";
import type { Project, IndexProps } from "../Utils/types";
import { Form, Col, Row, Container, Button, Card } from "react-bootstrap";
// import { Inertia } from "@inertiajs/inertia";

const Create: React.FC<IndexProps> = ({ auth }: IndexProps): any => {
  const { t } = useTranslation();
  const { data, setData, post, errors } = useForm<Project>({
    image_path: undefined,
    name: "",
    status: "",
    description: "",
    due_date: new Date(),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('project.store'));
    // const formData = new FormData();
    // formData.append('name', data.name);
    // formData.append('description', data.description);
    // formData.append('status', data.status);
    // formData.append('due_date', data.due_date.toISOString());
    // if (data.image_path) {
    //     formData.append('image_path', data.image_path);
    // }

    // Inertia.post(route('project.store'), formData);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="d-flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {t("create")}
          </h2>
        </div>
      }
    >
      <Container className="py-5 container mx-auto">
        <Head title="Проекты" />
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Form className="p-4" onSubmit={onSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("form.name")}</Form.Label>
                    <Form.Control
                      type="text"
                      className="py-2"
                      value={data.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData("name", e.target.value)
                      }
                      placeholder={t("form.name")}
                      isInvalid={!!errors.name}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("form.image")}</Form.Label>
                    <Form.Control
                      type="file"
                      name="image_path"
                      className="py-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          setData("image_path", e.target.files[0]);
                        }                        
                      }}
                      isInvalid={!!errors.image_path}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.image_path}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("form.status")}</Form.Label>
                    <Form.Select
                      className="py-2"
                      value={data.status}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setData("status", e.target.value)
                      }
                      isInvalid={!!errors.status}
                      required
                    >
                      <option value="">{t("project.projectStatus.nothing")}</option>
                      <option value="Отменен">{t("project.projectStatus.pending")}</option>
                      <option value="В процессе">
                        {t("project.projectStatus.in_progress")}
                      </option>
                      <option value="Завершен">{t("project.projectStatus.completed")}</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("form.description")}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="py-2"
                      value={data.description}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData("description", e.target.value)
                      }
                      placeholder={t("form.description")}
                      isInvalid={!!errors.description}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("form.due_date")}</Form.Label>
                    <Form.Control
                      type="date"
                      className="py-2"
                      value={data.due_date.toISOString().split("T")[0]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData("due_date", new Date(e.target.value))
                      }
                      isInvalid={!!errors.due_date}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.due_date}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="w-100 py-2 mb-3"
                    variant="primary"
                  >
                    {t("buttons.create")}
                  </Button>
                  <div className="d-flex justify-content-center">
                    <Link href={route("project.index")}>
                      {t("links.toProjects")}
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AuthenticatedLayout>
  );
};

export default Create;
