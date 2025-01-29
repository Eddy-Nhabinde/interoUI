import { formaterToIsoDate } from "../../../../utils/services/dateFormater"

export function getDates({ sDate, eDate }) {
    let params = ""

    function formatDates(value) {
        if (value.length < 2) {
            return "0" + value
        } else {
            return value
        }
    }

    function last30Days() {
        params = "period="

        for (let a = 1; a <= 30; a++) {
            let data = new Date(new Date().setDate(new Date().getDate() - a))
            let date = data.getFullYear().toString()
            date += formatDates(data.getMonth().toString())
            date += formatDates(data.getDate().toString())

            params += date + ";"
        }
        return params.substring(0, params.length - 1)
    }

    function LastYears() {
        params = "period="
        var currentYear = new Date().getFullYear()
        let startYear = 2010

        while (startYear <= currentYear) {
            let year = startYear++
            params += year.toString() + ";"
        }
        return params.substring(0, params.length - 1)
    }

    function generatePeriod(range) {
        if (range) {
            return LastYears()
        } else {
            if (!sDate || !eDate) {
                return LastYears()
            } else {
                return params = `startDate=${formaterToIsoDate(sDate)}&endDate=${formaterToIsoDate(eDate)}`
            }
        }
    }

    return { generatePeriod, last30Days }
}