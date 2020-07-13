import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import DatePicker, { registerLocale } from "react-datepicker";
import { withSnackbar } from "react-simple-snackbar";
import { Form, FormGroup, Label, Input } from "reactstrap";
import ActionButton from "../common/ActionButtons";

import * as SGlobal from "../../styled";

import API from "../../config/api";

import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);

const validations = Yup.object().shape({
  title: Yup.string()
    .min(10, "Mínimo de 10 caracteres")
    .required("Campo obrigatório"),
  startDate: Yup.date().required("Campo obrigatório").nullable(),
  endDate: Yup.date().required("Campo obrigatório").nullable(),
});

const ContractForm = ({
  contract = {
    id: null,
    title: "",
    startDate: null,
    endDate: null,
    filename: "",
  },
  openSnackbar,
}) => {
  const history = useHistory();

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [fileErrorMessage, setFileErrorMessage] = useState("");

  const submitForm = useCallback(async (values) => {
    let message = "";
    try {
      const formData = new FormData();

      formData.append("document", file);
      formData.append("data", JSON.stringify(values));

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      await API.post("/contract", formData, config);
      message = "Contrato salvo com sucesso";
      history.push("/contract");
    } catch (err) {
      message = "Erro ao cadastrar contrato";
    } finally {
      openSnackbar(message, 5000);
    }
  });

  return (
    <div>
      <h2>Adicionar contrato</h2>
      <Formik
        initialValues={{ ...contract }}
        validationSchema={validations}
        onSubmit={async (values) => submitForm(values)}
      >
        {({
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();

              if (!file) {
                setFileErrorMessage("O arquivo é obrigatório");
                setFileError(true);
                return;
              }

              setFileError(false);
              setFileErrorMessage("");
            }}
          >
            <FormGroup>
              <Label>Titulo</Label>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                name="title"
                placeholder="Digite o título"
              />
              {touched.title && errors.title && (
                <SGlobal.LayoutError>{errors.title}</SGlobal.LayoutError>
              )}
            </FormGroup>
            <FormGroup>
              <div className="row">
                <div className="d-flex flex-column col-md-6 col-sm-12">
                  <Label>Data inicial</Label>
                  <DatePicker
                    component={Input}
                    className="form-control"
                    name={"startDate"}
                    value={values.startDate}
                    selected={values.startDate}
                    onChange={(e) => setFieldValue("startDate", e)}
                    selectsStart
                    startDate={values.startDate}
                    endDate={values.endDate}
                    placeholderText="Selecione a data inicial"
                    locale="pt"
                    dateFormat="dd/MM/yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  {touched.startDate && errors.startDate && (
                    <SGlobal.LayoutError>
                      {errors.startDate}
                    </SGlobal.LayoutError>
                  )}
                </div>

                <div className="d-flex flex-column  col-md-6 col-sm-12">
                  <Label>Data final</Label>
                  <DatePicker
                    component={Input}
                    className="form-control"
                    name={"endDate"}
                    selected={values.endDate}
                    onChange={(e) => setFieldValue("endDate", e)}
                    selectsEnd
                    startDate={values.startDate}
                    endDate={values.endDate}
                    minDate={values.startDate}
                    placeholderText="Selecione a data final"
                    locale="pt"
                    dateFormat="dd/MM/yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  {touched.endDate && errors.endDate && (
                    <SGlobal.LayoutError>{errors.endDate}</SGlobal.LayoutError>
                  )}
                </div>
              </div>
            </FormGroup>

            <FormGroup>
              <Label>Adicionar arquivo</Label>
              <Input
                type="file"
                className="btn btn-outline-secondary"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const ext = file.name.substr(file.name.lastIndexOf(".") + 1);

                  if (ext === "pdf" || ext === "doc" || ext === "docx") {
                    setFile(file);
                    setFileError(false);
                    setFileErrorMessage("");
                    return;
                  }
                  setFileErrorMessage(
                    "Arquivo somente do tipo PDF, DOC ou DOCX"
                  );
                  setFileError(true);
                }}
                onBlur={handleBlur}
                name="filename"
              />
              {!!fileError && (
                <SGlobal.LayoutError>{fileErrorMessage}</SGlobal.LayoutError>
              )}
            </FormGroup>
            <ActionButton
              cancelLabel="Voltar"
              hasSubmitButton
              submitLabel="Salvar"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withSnackbar(ContractForm, { position: "top-right" });
