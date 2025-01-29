import React from "react";
import { Offline } from "react-detect-offline";
import { NavItem, NavLink } from "shards-react";
import SignalWifiBadIcon from '@mui/icons-material/SignalWifiBad';
import { Tooltip } from "@mui/material";

const OfflineComponent = () => {

    return (
        <Offline>
            <NavItem className="border-right dropdown notifications">
                <NavLink className="nav-link-icon text-center">
                    <Offline>
                        <Tooltip title="No internet conection"><SignalWifiBadIcon style={{color:'red'}}/></Tooltip>
                    </Offline>
                </NavLink>
            </NavItem>
        </Offline>
    );
}

export { OfflineComponent }