import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import { Head, Link, useForm } from "@inertiajs/react";
import type { User, IndexProps } from "../../types/types";
import { Form, Col, Row, Container, Button, Card } from "react-bootstrap";

const Edit: React.FC<IndexProps> = ({ auth, user }: IndexProps) => {
  const { t } = useTranslation();
  const { data, setData, put, errors } = useForm({
    image: user.image,
    name: user.name,
    email: user.email,
    password: user.password,
    password_confirmation: user.password_confirmation,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    put(route("user.update", user.data.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="d-flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {t("edit")} "{user.data.name}"
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
                    <Form.Label>{t("form.name.user")}</Form.Label>
                    <Form.Control
                      type="text"
                      className="py-2"
                      value={data.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData("name", e.target.value)
                      }
                      placeholder={t("form.name.user")}
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
                      name="image"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData(
                              "image",
                              e.target.files ? e.target.files[0] : null
                          )
                      }
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.image}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("form.email")}</Form.Label>
                    <Form.Control
                      type="text"
                      className="py-2"
                      value={data.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData("email", e.target.value)
                      }
                      placeholder={t("form.email")}
                      isInvalid={!!errors.email}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("form.password")}</Form.Label>
                    <Form.Control
                      type="password"
                      className="py-2"
                      value={data.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData("password", e.target.value)
                      }
                      placeholder={t("form.password")}
                      isInvalid={!!errors.password}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("form.password_confirmation")}</Form.Label>
                    <Form.Control
                      type="password"
                      className="py-2"
                      value={data.password_confirmation}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData("password_confirmation", e.target.value)
                      }
                      placeholder={t("form.password_confirmation")}
                      isInvalid={!!errors.password_confirmation}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password_confirmation}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="w-100 py-2 mb-3"
                    variant="primary"
                  >
                    {t("buttons.edit")}
                  </Button>
                  <div className="d-flex justify-content-center">
                    <Link href={route("user.index")}>
                      {t("links.toUsers")}
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

export default Edit;
