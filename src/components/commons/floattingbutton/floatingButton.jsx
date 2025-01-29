import React from "react";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";

const fabStyle = {
  position: "fixed",
  bottom: 22,
  right: 22,
};

export default function FloatingButton({ title, icon, action, hidde, variant }) {
  return (
    <div>
      <Tooltip
        hidden={hidde}
        title={title}
        aria-label="edit"
        onClick={action}
        variant={variant}
        //onClick={() => history.push(`/umm/registration`)}
      >
        <Fab color="success" className="" sx={fabStyle}>
          {icon}
        </Fab>
      </Tooltip>
    </div>
  );
}
