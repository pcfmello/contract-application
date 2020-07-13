import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { withSnackbar } from "react-simple-snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileWord } from "@fortawesome/free-solid-svg-icons";
import Loading from "../common/Loading";
import ActionButton from "../common/ActionButtons";

import * as SGlobal from "../../styled";
import API from "../../config/api";

const ContractShow = ({ match, openSnackbar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let message = "";
      try {
        const result = await API(`/contract/${match.params.id}`);
        setContract(result.data);
      } catch (err) {
        message = "Erro ao carregar o contrato";
        openSnackbar(message, 5000);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;
  };

  return (
    <SGlobal.LayoutShow>
      <h2>Detalhes do contrato</h2>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {<div>Não há dados para exibir</div>}
          {!!contract && (
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Título</label>
                  <div className="item-data">{contract.title}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Data inicial</label>
                  <div className="item-data">
                    {formatDate(contract.startDate)}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Data final</label>
                  <div className="item-data">
                    {formatDate(contract.endDate)}
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <div>Arquivo</div>
                  <SGlobal.LayoutFileDownload>
                    <a
                      href={`http://localhost:3001/documents/${contract.filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={contract.ext === "pdf" ? faFilePdf : faFileWord}
                      />
                    </a>
                  </SGlobal.LayoutFileDownload>
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

ContractShow.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withSnackbar(ContractShow, { position: "top-right" });
