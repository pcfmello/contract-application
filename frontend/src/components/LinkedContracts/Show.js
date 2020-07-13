import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { withSnackbar } from "react-simple-snackbar";
import { ListGroup, ListGroupItem } from "reactstrap";
import ActionButton from "../common/ActionButtons";
import Loading from "../common/Loading";

import * as SGlobal from "../../styled";

import API from "../../config/api";

const LinkedContractShow = ({ match, openSnackbar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [linkedContract, setLinkedContract] = useState(null);

  useEffect(() => {
    let message = "";
    const fetchData = async () => {
      try {
        const result = await API(`/linked-contract/${match.params.id}`);

        setLinkedContract(result.data);
      } catch (err) {
        message = "Erro ao carregar o contrato vinculado";
        openSnackbar(message, 5000);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <SGlobal.LayoutShow>
      <h2>Contrato vinculado</h2>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {!linkedContract && <div>Não há dados para exibir</div>}
          {!!linkedContract && (
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Título</label>
                  <div>
                    <Link to={`/contract/${linkedContract._id}`}>
                      {linkedContract.title}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>Partes</label>
                  <ListGroup>
                    {linkedContract.people.map((item, index) => (
                      <ListGroupItem key={index}>
                        <Link to={`/part/${item._id}`}>
                          {item.firstName} {item.lastName}
                        </Link>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
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

LinkedContractShow.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withSnackbar(LinkedContractShow, { position: "top-right" });
