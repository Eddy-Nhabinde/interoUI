import React, { useContext, useState } from "react";
import {
  NavItem,
  NavLink,
  Collapse,
  DropdownItem,
  Row,
  Card,
} from "shards-react";
import { modules } from "../../../../../modules/modulesContent";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../../../../context/AuthProvider";

const MainMenu = () => {

  const [visible, setVisible] = useState(false);
  const history = useHistory()
  const { auth } = useContext(AuthContext)

  const toggleNotifications = () => {
    setVisible(!visible);
  };

  const saveModuleContent = (module) => {
    history.push(`/${module.route}/${module.route}-home`)
  };

  return (
    <NavItem className="border-right dropdown notifications">
      <NavLink
        className="nav-link-icon text-center"
        onClick={() => toggleNotifications()}
      >
        <div className="nav-link-icon__wrapper">
          <i className="material-icons">apps</i>
        </div>
      </NavLink>
      <Collapse open={visible} className="dropdown-menu dropdown-menu-small">
        <Row className="p-4">
          {modules.map((module, index) => (
            (auth && auth.roles.includes(module.necessaryRole)) &&
            <DropdownItem key={index} className="col-lg-6" onClick={() => saveModuleContent(module)}>
              <Card className="text-center">
                <div className="notification__icon-wrapper m-2">
                  <div className="notification__icon">
                    <i className="material-icons">{module.icon}</i>
                  </div>
                </div>
                <div className="notification__content tex-center mb-2">
                  <h5>{module.shortName}</h5>
                  <p>{module.displayName}</p>
                </div>
              </Card>
            </DropdownItem>
          ))}
        </Row>
      </Collapse>
    </NavItem>
  );
};

export default MainMenu;
