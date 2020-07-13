import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import Navbar from "./components/NavigationBar";
import LinkedContracts from "./components/LinkedContracts";
import LinkedContractForm from "./components/LinkedContracts/Form";
import LinkedContractShow from "./components/LinkedContracts/Show";
import Contracts from "./components/Contracts";
import ContractForm from "./components/Contracts/Form";
import ContractShow from "./components/Contracts/Show";
import Part from "./components/Parts";
import PartForm from "./components/Parts/Form";
import PartShow from "./components/Parts/Show";

import * as SGlobal from "./styled";

function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Navbar />
        <SGlobal.LayoutContainer className="container">
          <Switch>
            <Route
              path="/linked-contract/add/new"
              component={LinkedContractForm}
            />
            <Route path="/linked-contract/:id" component={LinkedContractShow} />
            <Route path="/linked-contract" component={LinkedContracts} />

            <Route path="/contract/add/new" component={ContractForm} />
            <Route path="/contract/:id" component={ContractShow} />
            <Route path="/contract" component={Contracts} />

            <Route path="/part/add/new" component={PartForm} />
            <Route path="/part/:id" component={PartShow} />
            <Route path="/part" component={Part} />

            <Route path="*" render={() => <Redirect to="/linked-contract" />} />

            <Redirect to="/linked-contract" />
          </Switch>
        </SGlobal.LayoutContainer>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
