import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
  Button
} from "shards-react";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../../../../context/AuthProvider";

const UserActions = () => {
  const [visible, setVisible] = useState(false);
  const {auth, setAuth } = useContext(AuthContext)
  const history = useHistory()
  const { t } = useTranslation();

  const toggleUserActions = () => {
    setVisible(!visible);
  }

  const logout = () => {
    Cookies.remove('user')
    setAuth(null);
  }

  return (
    <>
    {auth ? (
      <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("../../../../../assets/images/avatars/user.png")}
            alt={auth && auth.username}
          />{" "}
          <span className="d-none d-md-inline-block">{auth && auth.username}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={visible}>
          <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i>{t("perfil")}
          </DropdownItem>

          <DropdownItem divider />
          <DropdownItem onClick={() => logout()} tag={Link} to="/login" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i>{t("terminar_sessao")}
          </DropdownItem>
        </Collapse>
      </NavItem>  
    ):(
      <div className="d-flex align-items-center px-2">
        <Button theme="light" active style={{width: 90}} onClick={() => history.push("/login")} className="text-primary">
          <i className="material-icons mr-2 text-primary">vpn_key</i>Login
        </Button>
      </div>
    )}
    </>
    
  );
}

export default UserActions;