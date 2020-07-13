import React from "react";
import { useHistory } from "react-router-dom";
import API from "../../config/api";
import { Formik } from "formik";
import * as Yup from "yup";

import { withSnackbar } from "react-simple-snackbar";
import { Form, FormGroup, Label, Input } from "reactstrap";
import ActionButton from "../common/ActionButtons";

import * as SGlobal from "../../styled";

const validations = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Mínimo de 3 caracteres")
    .required("Campo obrigatório"),
  lastName: Yup.string()
    .min(3, "Mínimo de 3 caracteres")
    .required("Campo obrigatório"),
  email: Yup.string()
    .email("E-mail com formato inválido (exemplo@exemplo.com)")
    .lowercase("E-mail deve estar em letras minúsculas")
    .required("Campo obrigatório"),
  cpf: Yup.string()
    .min(11, "CPF deve ter 11 números sem pontos ou hífen")
    .max(11, "CPF deve ter 11 números sem pontos ou hífen")
    .required("Campo obrigatório"),
  phone: Yup.string()
    .min(10, "Telefone deve ter pelo menos 10 números")
    .max(11, "Telefone deve ter no máximo 11 números")
    .required("Campo obrigatório"),
});

const PartForm = ({
  part = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    cpf: "",
    phone: "",
  },
  openSnackbar,
}) => {
  const history = useHistory();

  const submitForm = async (values) => {
    let message = "";
    try {
      await API.post("/part", values);
      message = "Parte salva com sucesso";

      history.push("/part");
    } catch (err) {
      message = "Erro ao salvar a parte";
    } finally {
      openSnackbar(message);
    }
  };

  return (
    <div>
      <h2>Adicionar parte</h2>
      <Formik
        initialValues={{ ...part }}
        validationSchema={validations}
        onSubmit={async (values) => submitForm(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => {
          return (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <FormGroup>
                <Label>Nome</Label>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  name="firstName"
                  placeholder="Digite seu nome"
                />
                {touched.firstName && errors.firstName && (
                  <SGlobal.LayoutError>{errors.firstName}</SGlobal.LayoutError>
                )}
              </FormGroup>
              <FormGroup>
                <Label>Sobrenome</Label>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  name="lastName"
                  placeholder="Digite seu sobrenome"
                />
                {touched.lastName && errors.lastName && (
                  <SGlobal.LayoutError>{errors.lastName}</SGlobal.LayoutError>
                )}
              </FormGroup>
              <FormGroup>
                <Label>E-mail</Label>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name="email"
                  placeholder="Digite seu e-mail"
                />
                {touched.email && errors.email && (
                  <SGlobal.LayoutError>{errors.email}</SGlobal.LayoutError>
                )}
              </FormGroup>
              <FormGroup>
                <Label>CPF</Label>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cpf}
                  name="cpf"
                  placeholder="Digite seu CPF"
                />
                {touched.cpf && errors.cpf && (
                  <SGlobal.LayoutError>{errors.cpf}</SGlobal.LayoutError>
                )}
              </FormGroup>
              <FormGroup>
                <Label>Telefone</Label>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  name="phone"
                  placeholder="Digite seu telefone"
                />
                {touched.phone && errors.phone && (
                  <SGlobal.LayoutError>{errors.phone}</SGlobal.LayoutError>
                )}
              </FormGroup>
              <ActionButton
                cancelLabel="Voltar"
                hasSubmitButton
                submitLabel="Salvar"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default withSnackbar(PartForm, { position: "top-right" });
