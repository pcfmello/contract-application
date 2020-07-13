import React from "react";
import PropTypes from "prop-types";
import { withSnackbar } from "react-simple-snackbar";

import * as SGlobal from "../../../styled";
import API from "../../../config/api";

const RemoveScaffold = ({
  moduleName,
  item,
  reloadItems,
  handleClose,
  openSnackbar,
}) => {
  const handleRemove = async () => {
    let message = "";
    try {
      await API.delete(`/${moduleName}/${item._id}`);
      reloadItems();
      handleClose();
      message = "Removido com sucesso";
    } catch (err) {
      message = "Erro ao remover";
    } finally {
      openSnackbar(message, 5000);
    }
  };

  return (
    <SGlobal.LayoutActionButtons>
      <div>
        <p>Are you sure removing "{item.title}"?</p>
      </div>
      <div className="actions">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </SGlobal.LayoutActionButtons>
  );
};

RemoveScaffold.propTypes = {
  moduleName: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  reloadItems: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(RemoveScaffold, { position: "top-right" });
