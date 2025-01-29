export function BuildSmallStatObject({ data, total }) {

    if (data && data.THIS_MONTH != undefined && data.THIS_WEEK != undefined && data.THIS_YEAR != undefined && data.TODAY != undefined)
        return {
            data: {
                summaries: {
                    today: data.TODAY,
                    dayVariation: {
                        status: false
                    },
                    thisWeek: data.THIS_WEEK,
                    weekVariation: {
                        status: false
                    },
                    thisYear: data.THIS_YEAR,
                    dayVariation: {
                        status: false
                    },
                    thisMonth: data.THIS_MONTH,
                    monthVariation: {
                        status: false
                    },
                    total: total
                }
            }
        }

    return {}
}