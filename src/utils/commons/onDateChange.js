import { formaterToIsoDate } from "../services/dateFormater";

export const onDateChange = ({ setSDate, setEDate, endDate, startDate, history }) => {

    function UpdateDateValues() {
        if (endDate) {
            setSDate(formaterToIsoDate(new Date(startDate)));
            setEDate(formaterToIsoDate(new Date(endDate)));
            const url = new URL(window.location.href);
            url.searchParams.set("startDate", formaterToIsoDate(new Date(startDate)));
            url.searchParams.set("endDate", formaterToIsoDate(new Date(endDate)));
            history.push(url.search)
        } else alert("You need endDate");
    }

    return { UpdateDateValues }
};