import styled from "styled-components";

export const LayoutContainer = styled.div`
  margin-top: 71px;

  h2 {
    margin-bottom: 2rem;
  }
`;

export const LayoutActionButtons = styled.div`
  button {
    display: block;
    width: 100%;
  }

  button,
  a {
    margin: 4px;
    float: right;
    width: 100%;
  }

  @media (min-width: 768px) {
    button,
    a {
      display: inline-block;
      width: auto;
    }
  }
`;

export const LayoutError = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const LayoutShow = styled.div`
  .item-data {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export const LayoutFileDownload = styled.div`
  font-size: 3rem;
`;
