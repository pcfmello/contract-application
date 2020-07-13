import React from "react";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ModalScaffold = ({ title, body }) => {
  return (
    <Modal fade={false} isOpen>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{body}</ModalBody>
    </Modal>
  );
};

ModalScaffold.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.object.isRequired,
};

export default ModalScaffold;
