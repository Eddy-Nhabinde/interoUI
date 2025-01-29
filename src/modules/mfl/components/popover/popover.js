import React from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Popover } from "@mui/material";
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
      <ReportGmailerrorredIcon
        fontSize="large"
        className="text-danger"
        variant="contained"
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onClick={handlePopoverClose}
      />
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
            onClick={() => history.push(`/mfl/mfl-details/${id}`)}
          >
            Ver detalhes
          </p>{" "}
        </div>
      </Popover>
    </div>
  );
};

export default SuggestUpdate;
