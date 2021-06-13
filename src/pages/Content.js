import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { Users, CreateUser } from "../pages/users/index";

const Content = () => {
  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/users/create/:userId?">
        <CreateUser />
      </Route>
      <Route exact path="/users">
        <Users />
      </Route>
    </Switch>
  );
};

export default Content;
