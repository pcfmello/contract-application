import React, { useState, useEffect } from "react";

import ListScaffold from "../common/ListScaffold";
import API from "../../config/api";

const LinkedContracts = () => {
  const moduleName = "linked-contract";
  const [isLoading, setIsLoading] = useState(true);
  const [linkedContracts, setLinkedContracts] = useState([]);

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

      setLinkedContracts(newData);
    } catch (err) {
      // alert.error("Erro ao carregar contratos vinculados");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ListScaffold
      isLoading={isLoading}
      list={linkedContracts}
      listTitle="Contratos vinculados"
      column="Título"
      modalTitle="Contrato vinculado"
      moduleName={moduleName}
      reloadItems={fetchData}
    />
  );
};

export default LinkedContracts;
