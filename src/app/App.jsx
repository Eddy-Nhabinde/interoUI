import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import withTracker from "../withTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import "../shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { PrintsContext } from "../context/PrintsContext";
import { AuthContext } from "../context/AuthProvider";
import Cookies from "js-cookie";
import { routes } from "../routes/routes";

const App = () => {
  const [module, setModule] = useState();
  const [auth, setAuth] = useState(JSON.parse(Cookies.get("user") || null));

  return (
    <Router>
      <Switch>
        <PrintsContext.Provider
          value={{
            module: module,
            setModule: setModule,
          }}
        >
          <AuthContext.Provider
            value={{
              auth: auth,
              setAuth: setAuth,
            }}
          >
            {routes().map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker((props) => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            ))}
          </AuthContext.Provider>
        </PrintsContext.Provider>
      </Switch>
    </Router>
  );
};

export default App;
