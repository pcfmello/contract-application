import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { withSnackbar } from "react-simple-snackbar";
import ActionButton from "../common/ActionButtons";
import Loading from "../common/Loading";

import * as SGlobal from "../../styled";

import API from "../../config/api";

const PartShow = ({ match, openSnackbar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [part, setPart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let message = "";
      try {
        const result = await API(`/part/${match.params.id}`);

        setPart(result.data);
      } catch (err) {
        message = "Erro ao carregar a parte";
        openSnackbar(message, 5000);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <SGlobal.LayoutShow>
      <h2>Detalhes da parte</h2>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {!part && <div>Não há dados para exibir</div>}
          {!!part && (
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Nome</label>
                  <div className="item-data">{part.firstName}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Sobrenome</label>
                  <div className="item-data">{part.lastName}</div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>E-mail</label>
                  <div className="item-data">{part.email}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>CPF</label>
                  <div className="item-data">{part.cpf}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Telefone</label>
                  <div className="item-data">{part.phone}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <ActionButton cancelLabel="Voltar" />
    </SGlobal.LayoutShow>
  );
};

PartShow.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withSnackbar(PartShow, { position: "top-right" });
