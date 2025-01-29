import React, {useState } from "react";
import classNames from "classnames";
import { Col } from "shards-react";
import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

const MainSidebar = (props) => {

  const [menuVisible, ] = useState(false)


  const classes = classNames("main-sidebar", "px-0", "col-12", menuVisible && "open");

  return (
    <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <SidebarMainNavbar />
      <SidebarSearch />
      <SidebarNavItems />
      <span>Ola</span>
    </Col>
  );
}

export default MainSidebar;
