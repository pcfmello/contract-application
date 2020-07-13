import React, { useState, useEffect } from "react";

import ListScaffold from "../common/ListScaffold";
import API from "../../config/api";

const Contracts = () => {
  const moduleName = "contract";
  const [isLoading, setIsLoading] = useState(true);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await API(`/${moduleName}`);

      const newData = result.data.map((item) => ({
        ...item,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
      }));

      setContracts(newData);
    } catch (err) {
      // alert.error("Erro ao carregar contratos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ListScaffold
      isLoading={isLoading}
      list={contracts}
      listTitle="Contratos"
      column="Título"
      modalTitle="Contrato"
      moduleName={moduleName}
      reloadItems={fetchData}
      hasListActions
    />
  );
};

export default Contracts;
