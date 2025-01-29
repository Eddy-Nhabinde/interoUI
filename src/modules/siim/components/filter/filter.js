import React from "react";
import { Row, Col, Card, CardBody, Button } from "shards-react";
import RangeDatePicker from "../../../../components/commons/inputs/RangeDatePicker";
import { onDataParamsChange, onParamChange } from "../../../../utils/services/onParamsChange";
import { formaterToIsoDate } from "../../../../utils/services/dateFormater";
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom'
import { TreeComponent } from "../../../../components/commons/tree/orgUnitTree";
import { useState } from "react";

export default function Filter({ setSDate, setEDate, eDate, sDate, setSelectedOu, selectedOu }) {
    const { t } = useTranslation();
    const history = useHistory()
    const [startDate, setStartDate] = useState(sDate)
    const [endDate, setEndDate] = useState(eDate)
        
    const onDateChange = () => {
        if (startDate && endDate) {
            if (startDate != sDate) setSDate(formaterToIsoDate(new Date(startDate)));
            if (endDate != eDate) setEDate(formaterToIsoDate(new Date(endDate)));

            const url = new URL(window.location.href);
            url.searchParams.set("startDate", formaterToIsoDate(new Date(startDate)));
            url.searchParams.set("endDate", formaterToIsoDate(new Date(endDate)));
            history.push(url.search)
        } else alert("You need end date and start date");
    };

    const clearParams = () => {
        setSDate(undefined);
        setEDate(undefined);
        onDataParamsChange(history, 'startDate', 'endDate')
    };

    return (
        <Card className="h-100 mb-4">
            <CardBody className=" py-0 ">
                <Row className="mb-4">
                    <Col className="d-flex mb-2 mb-sm-0 mt-4">
                        <TreeComponent setSelectedOu={setSelectedOu} selectedOu={selectedOu} />
                        <RangeDatePicker
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                        />
                    </Col>
                    <Col sm="6" className="text-right">
                        <Button
                            size="sm"
                            className="btn btn-outline-primary mb-2 mb-sm-0 mt-4 mr-1"
                            onClick={() => onDateChange()}
                        >
                            {t("atualizar_dados")}
                            <i class="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                        <Button
                            size="sm"
                            className="btn btn-outline-primary mb-2 mb-sm-0 mt-4"
                            onClick={() => clearParams()}
                        >
                            {t("limpar_dados")}
                            <i class="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
