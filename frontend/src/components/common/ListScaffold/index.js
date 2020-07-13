import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CardTitle } from "reactstrap";

import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Loading from "../Loading";
import Modal from "../ModalScaffold";
import RemoveScaffold from "../RemoveScaffold";

import * as S from "./styled";
import * as SGlobal from "../../../styled";

const ListScaffold = ({
  isLoading,
  list,
  column,
  listTitle,
  modalTitle,
  moduleName,
  reloadItems,
  hasListActions,
}) => {
  const [item, setItem] = useState(null);
  const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);
  const openModalToRemove = (item) => {
    setItem(item);
    setIsModalRemoveOpen(true);
  };

  return (
    <>
      <h2>{listTitle}</h2>

      <S.LayoutButtonModal>
        <SGlobal.LayoutActionButtons>
          <Link
            to={`/${moduleName}/add/new`}
            className="add-button btn btn-secondary btn-lg"
          >
            Adicionar
          </Link>
        </SGlobal.LayoutActionButtons>
      </S.LayoutButtonModal>

      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {/* Visible only xs devices */}
          <div className="d-sm-block d-md-none">
            {list.map((item) => (
              <S.LayoutCard body key={item._id}>
                <CardTitle>{item.title}</CardTitle>
                <SGlobal.LayoutActionButtons>
                  <S.LayoutButtonsList>
                    <Link
                      to={`/${moduleName}/${item._id}`}
                      className="btn btn-outline-secondary"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                    {hasListActions && (
                      <button
                        className="btn btn-danger"
                        onClick={() => openModalToRemove(item)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    )}
                  </S.LayoutButtonsList>
                </SGlobal.LayoutActionButtons>
              </S.LayoutCard>
            ))}
          </div>

          {/* Visible in devices larger than xs */}
          <div className="d-md-block d-sm-none d-none">
            <S.LayoutTable responsive>
              <thead>
                <tr>
                  <th className="title">{column}</th>
                  {hasListActions && <th className="actions">Ações</th>}
                </tr>
              </thead>
              <tbody>
                {!!list.length &&
                  list.map((item) => (
                    <tr key={item._id}>
                      <td className="title">
                        <Link to={`/${moduleName}/${item._id}`}>
                          {item.title}
                        </Link>
                      </td>
                      {hasListActions && (
                        <td className="actions">
                          <S.LayoutButton
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => openModalToRemove(item)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </S.LayoutButton>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </S.LayoutTable>
          </div>
          {!list.length && <div className="text-center">Lista vazia</div>}
        </>
      )}

      {isModalRemoveOpen && (
        <Modal
          title={`Remover ${modalTitle}`}
          submitButtonLabel="Remove"
          body={
            <RemoveScaffold
              item={item}
              moduleName={moduleName}
              reloadItems={reloadItems}
              handleClose={() => setIsModalRemoveOpen(false)}
            />
          }
        />
      )}
    </>
  );
};

ListScaffold.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  column: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  moduleName: PropTypes.string.isRequired,
  reloadItems: PropTypes.func.isRequired,
  openModalToRemove: PropTypes.func,
  hasListActions: PropTypes.bool,
};
export default ListScaffold;
