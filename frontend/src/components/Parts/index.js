import React, { useState, useEffect } from "react";

import ListScaffold from "../common/ListScaffold";
import API from "../../config/api";

const Parts = () => {
  const moduleName = "part";
  const [isLoading, setIsLoading] = useState(true);
  const [parts, setParts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await API(`/${moduleName}`);

      setParts(
        result.data.map((item) => ({
          ...item,
          title: `${item.firstName} ${item.lastName}`,
        }))
      );
    } catch (err) {
      // alert.error(`Erro ao carregar partes`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ListScaffold
      isLoading={isLoading}
      list={parts}
      listTitle="Partes"
      column="Nome"
      modalTitle="Parte"
      moduleName={moduleName}
      reloadItems={fetchData}
    />
  );
};

export default Parts;
