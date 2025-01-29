import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button, List, ListItem, ListSubheader, Popover } from "@mui/material";
import "./flag-icons-master/css/flag-icon.css";

const languageMap = {
  en: {
    label: (
      <div className="d-flex align-items-center">
        <span class="flag-icon flag-icon-usa mr-2"></span> <span>en</span>
      </div>
    ),
    dir: "ltr",
    active: true,
    lng: "en",
  },
  pt: {
    label: (
      <div className="d-flex align-items-center">
        <span class="flag-icon flag-icon-prt mr-2"></span>{" "}
        <span>pt</span>
      </div>
    ),
    dir: "ltr",
    active: false,
    lng: "pt",
  },
};

const LanguageSelect = () => {
  const selected = localStorage.getItem("i18nextLng") || "en";
  const { t } = useTranslation();

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  
  React.useEffect(() => {
    document.body.dir = languageMap[selected].dir;
  }, [menuAnchor, selected]);

  console.log(languageMap)
  return (
    <div className="d-flex justify-content-end align-items-center language-select-root">
      <Button
        style={{ color: "black", textTransform: "capitalize" }}
        onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}
      >
        {languageMap[selected].label}
        <ArrowDropDownIcon fontSize="small" />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div>
          <List>
            <ListSubheader>{t("select_language")}</ListSubheader>
            {Object.keys(languageMap).map((item) => (
              <ListItem
                button
                key={item}
                onClick={() => {
                  console.log(item);
                  i18next.changeLanguage(item);
                  setMenuAnchor(null);
                }}
              >
                {languageMap[item].label}
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelect;
