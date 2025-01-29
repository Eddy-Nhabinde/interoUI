import React from "react";
import { Nav } from "shards-react";
import { LanguageSelect } from "./LanguageSelect";
import MainMenu from "./MainMenu";

import Notifications from "./Notifications";
import UserActions from "./UserActions";

export default ({ isHomeLayout, isAuth}) => {
  return (
    <Nav navbar className="border-left flex-row">
      <LanguageSelect />
      {
        (!isHomeLayout && isAuth) &&
        (
          <>
            <Notifications />
            <MainMenu />
          </>
        )
      }
      <UserActions />
    </Nav>
  )
};
