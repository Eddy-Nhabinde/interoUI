import * as React from "react";

import Grid from "@mui/material/Grid";

import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";

import ListItemIcon from "@mui/material/ListItemIcon";

import ListItemText from "@mui/material/ListItemText";

import Checkbox from "@mui/material/Checkbox";

import Button from "@mui/material/Button";

import Paper from "@mui/material/Paper";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardHeader,
  Divider,
} from "@mui/material";

import AddBoxIcon from "@mui/icons-material/AddBox";

import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferListUmm({ right, setRight, expandedAll }) {
  const [checked, setChecked] = React.useState([]);

  const [left, setLeft] = React.useState(["VIEW", "MANAGE", "ADMIN"]);

  const leftChecked = intersection(checked, left);

  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));

    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));

    setLeft(not(left, leftChecked));

    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));

    setRight(not(right, rightChecked));

    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));

    setRight([]);
  };

  const customList = (title, items) => (
    <>
      <Card sx={{ width: 200, height: 200 }}>
        <CardHeader sx={{ px: 2, py: 1 }} subheader={title} />

        <Divider />

        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>

                <ListItemText id={labelId} primary={value} />
              </ListItem>
            );
          })}

          <ListItem />
        </List>
      </Card>
    </>
  );

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        expanded={expanded === "panel1" || expandedAll}
        onChange={handleChange("panel1")}
        className="mb-3"
      >
        <AccordionSummary
          expandIcon={
            expanded === `panel1` || expandedAll ? (
              <IndeterminateCheckBoxIcon color="error" />
            ) : (
              <AddBoxIcon color="primary" />
            )
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h6
            style={{
              width: "33%",

              flexShrink: 0,

              fontWeight: 550,

              //opacity: 0.5,
            }}
          >
            UMM
          </h6>
        </AccordionSummary>

        <AccordionDetails>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>{customList("Choose roles", left)}</Grid>

            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleAllRight}
                  disabled={left.length === 0}
                  aria-label="move all right"
                >
                  ≫
                </Button>

                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>

                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>

                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleAllLeft}
                  disabled={right.length === 0}
                  aria-label="move all left"
                >
                  ≪
                </Button>
              </Grid>
            </Grid>

            <Grid item>{customList("Selected", right)}</Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
