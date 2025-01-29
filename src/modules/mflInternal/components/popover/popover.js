import React from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { IconButton, Popover } from "@mui/material";
import { useHistory } from "react-router-dom";

const SuggestUpdate = ({ data, id }) => {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton size="small">
        <ReportGmailerrorredIcon
        fontSize="medium"
        className="text-danger"
        variant="contained"
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onClick={handlePopoverOpen}
      />
      </IconButton>
      
      <Popover
        id="mouse-over-popover"
        elevation={2}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          style: {
            backgroundColor: "white",
            padding: "5px 15px",
          },
        }}
      >
        <p>Actualização necessária!</p>
        <div className="d-flex justify-content-center">
          <p
            className="text-primary see-details"
            onClick={() => history.push(`/mfl-internal/orgunit-details/${id}`)}
          >
            Ver detalhes
          </p>{" "}
        </div>
      </Popover>
    </div>
  );
};

export default SuggestUpdate;
