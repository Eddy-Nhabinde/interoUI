import React from "react";
import { NavItem, NavLink} from "shards-react";
import  LanguageSelector from '../../../../commons/langSelector/LangSelector';


const LanguageSelect = () =>  {

    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
        >
          <LanguageSelector/>
        </NavLink>
        
      </NavItem>
    );
  }

  export {LanguageSelect}