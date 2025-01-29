import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { routes } from "../routes/routes";
import withTracker from "../../../withTracker";

const UmmApp = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation()

  useEffect(() => {
    if (path === "/umm" && location.pathname.split("/").length<3) {
      history.replace(`/umm/umm-home`);
    }
  }, [path]);

  return (
    <Router>
      <Switch>
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
      </Switch>
    </Router>
  );
};

export default UmmApp;
