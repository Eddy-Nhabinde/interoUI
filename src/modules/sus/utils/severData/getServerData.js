import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import React from "react";

export function getServerData({ orgUnits, setSyncId }) {
    let icons = {
        ERROR: <CloseIcon style={{ color: "#F44E3F" }} />,
        SUCCESS: <DoneIcon style={{ color: "#63D471" }} />
    }

    function getIcon(event, tabColumns) {
        let data = []
        for (let a = 4; a < tabColumns.length; a++) {
            let icon = null, syncId = null

            if (event[tabColumns[a]]) {
                if (event[tabColumns[a]].status.status) {
                    icon = icons[event[tabColumns[a]].status.status]
                    syncId = event[tabColumns[a]].status.syncId
                } else {
                    icon = icons[event[tabColumns[a]].status]
                    syncId = event[tabColumns[a]].syncId
                }

                data.push({ icon: icon, event: () => setSyncId(syncId) })
            } else {
                data.push({ icon: <RemoveCircleOutlineIcon style={{ color: "#BACDB0" }} />, event: () => { } })
            }
        }
        return data
    }

    return { getIcon }
}