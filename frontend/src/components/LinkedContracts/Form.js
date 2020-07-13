import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withSnackbar } from "react-simple-snackbar";
import API from "../../config/api";

import Select from "react-select";
import { Form, FormGroup, Label } from "reactstrap";
import Loading from "../common/Loading";
import ActionButton from "../common/ActionButtons";

import * as SGlobal from "../../styled";

const LinkedContractForm = ({ openSnackbar }) => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [wasTryingToSubmit, setWasTryingToSubmit] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [contractSelected, setContractSelected] = useState("");
  const [parts, setParts] = useState([]);
  const [partsSelected, setPartsSelected] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([
        API("/linked-contract/unlinked-contracts-only"),
        API("/part"),
      ]).then((values) => {
        setContracts(
          values[0].data.map((item) => ({
            label: item.title,
            value: item._id,
          }))
        );
        setParts(
          values[1].data.map((item) => ({
            label: `${item.firstName} ${item.lastName}`,
            value: item._id,
          }))
        );
      });
    } catch (err) {
      openSnackbar("Erro ao carregar listas de contratos e partes");
    } finally {
      setIsLoading(false);
    }
  };

  const submit = async (e) => {
    let message = "";
    try {
      e.preventDefault();

      setWasTryingToSubmit(true);

      if (!contractSelected || !partsSelected.length) {
        return;
      }

      const body = {
        peopleIds: partsSelected.map((item) => item.value),
      };

      await API.put(`/linked-contract/${contractSelected.value}`, body);
      message = "Contrato vinculado com sucesso";
      history.goBack();
    } catch (err) {
      message = "Erro ao vincular contrato";
    } finally {
      openSnackbar(message, 5000);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Vincular um contrato</h2>
      <Form>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            {(!contracts.length || !parts.length) && (
              <div>Não existem contratos e/ou partes cadastradas.</div>
            )}
            {!!contracts.length && !!parts.length && (
              <>
                <FormGroup>
                  <Label>Contrato</Label>
                  <Select
                    options={contracts}
                    onChange={(e) => setContractSelected(e)}
                    value={contractSelected}
                    isLoading={!contracts}
                    placeholder="SELECIONE"
                    isClearable
                  />
                  {wasTryingToSubmit && !contractSelected && (
                    <SGlobal.LayoutError>
                      Selecione o contrato
                    </SGlobal.LayoutError>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Selecione as partes</Label>
                  <Select
                    options={parts}
                    closeMenuOnSelect={false}
                    isMulti
                    value={partsSelected}
                    onChange={(e) => setPartsSelected(e)}
                    isLoading={!parts.length}
                    placeholder="SELECIONE"
                  />
                  {wasTryingToSubmit && !partsSelected.length && (
                    <SGlobal.LayoutError>
                      Selecione uma ou mais partes
                    </SGlobal.LayoutError>
                  )}
                </FormGroup>
              </>
            )}
          </>
        )}
        <ActionButton
          cancelLabel="Voltar"
          hasSubmitButton={!!contracts.length && !!parts.length}
          submitLabel="Vincular"
          handleSubmit={submit}
        />
      </Form>
    </div>
  );
};

export default withSnackbar(LinkedContractForm, { position: "top-right" });
