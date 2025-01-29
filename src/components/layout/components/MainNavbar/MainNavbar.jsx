import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar } from "shards-react";

import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";
import { AuthContext } from "../../../../context/AuthProvider";
import styles from '../../../../assets/styles/MainNavbar.module.css'
import useMediaQuery from "@mui/material/useMediaQuery";

const MainNavbar = ({ stickyTop, isHomeLayout }) => {
  const { auth } = useContext(AuthContext);
  const matches = useMediaQuery('(max-width: 550px)')
  const matches3 = useMediaQuery('(max-width: 920px)')
  const matches2 = useMediaQuery('(min-width: 1077px)')


  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar type="navbar-dark" className={matches3 ? styles.navMediaQuery900 : matches ? styles.navMediaQuery550 : styles.nav} >
          <div>
            {matches2 && <NavbarSearch />}
          </div>
          <div className={styles.Navbar}>
            <NavbarNav isHomeLayout={isHomeLayout} isAuth={auth} />
            <NavbarToggle />
          </div>
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
