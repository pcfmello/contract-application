import React, { useState } from "react";
import * as S from "./styled";
import { NavLink as RRNavLink } from "react-router-dom";

import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <S.NavbarWrapper color="light" light expand="md">
      <div className="container">
        <NavbarBrand>ONLINE CONTRACTS</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse className="justify-content-end" isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                to="/linked-contract"
                activeClassName="active"
              >
                Contratos vinculados
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/contract" activeClassName="active">
                Contratos
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/part" activeClassName="active">
                Partes
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </S.NavbarWrapper>
  );
};

export default NavigationBar;
