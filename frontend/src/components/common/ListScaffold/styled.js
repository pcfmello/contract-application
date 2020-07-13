import styled from "styled-components";
import { Card, Table } from "reactstrap";

export const LayoutCard = styled(Card)`
  margin-bottom: 1rem;
`;

export const LayoutButton = styled.button`
  width: 35px;
  height: 35px;
  margin-left: 0.5rem;
`;

export const LayoutTable = styled(Table)`
  th {
    text-transform: uppercase;
  }

  .title {
    flex: auto;
  }

  .actions {
    text-align: center;
    width: 120px;
  }
`;

export const LayoutButtonsList = styled.div`
  button {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const LayoutButtonModal = styled.div`
  .add-button,
  .add-button-desktop {
    margin-bottom: 1rem;
  }
`;
