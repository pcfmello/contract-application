import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import * as SGlobal from "../../../styled";

const ActionButtons = ({
  hasSubmitButton,
  submitLabel,
  handleSubmit,
  cancelLabel,
}) => {
  const history = useHistory();

  return (
    <SGlobal.LayoutActionButtons>
      {hasSubmitButton && (
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-secondary"
        >
          {submitLabel}
        </button>
      )}
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={history.goBack}
      >
        {cancelLabel}
      </button>
    </SGlobal.LayoutActionButtons>
  );
};
ActionButtons.propTypes = {
  hasSubmitButton: PropTypes.bool,
  submitLabel: PropTypes.string,
  handleSubmit: PropTypes.func,
  cancelLabel: PropTypes.string.isRequired,
};

export default ActionButtons;
