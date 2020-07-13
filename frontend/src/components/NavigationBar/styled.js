import styled from "styled-components";
import { Navbar } from "reactstrap";

export const NavbarWrapper = styled(Navbar)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  .active {
    font-weight: bold;
  }
`;
