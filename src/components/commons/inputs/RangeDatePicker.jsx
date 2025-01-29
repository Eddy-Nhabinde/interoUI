import React from "react";
import classNames from "classnames";
import {
  InputGroup,
  DatePicker,
  InputGroupAddon,
  InputGroupText
} from "shards-react";
import "../../../assets/styles/range-date-picker.css";
import { useTranslation } from "react-i18next";

const RangeDatePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const { t } = useTranslation();

  const classes = classNames("d-flex", "my-auto", "date-range");

  return (
    <InputGroup className={classes}>
      <DatePicker
        size="sm"
        selected={startDate}
        onChange={event => event > endDate ? (setEndDate(undefined), setStartDate(event)) : (setStartDate(event))}
        placeholderText={t("dataInicio")}
        dropdownMode="select"
        className="text-center"
      />
      <DatePicker
        size="sm"
        selected={endDate}
        onChange={event => event >= startDate && setEndDate(event)}
        placeholderText={t("dataFim")}
        dropdownMode="select"
        className="text-center"
      />
      <InputGroupAddon type="append">
        <InputGroupText>
          <i className="material-icons">&#xE916;</i>
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default RangeDatePicker;
