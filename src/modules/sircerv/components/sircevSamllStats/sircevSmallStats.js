const sircevSmallStats = (t, dashboardData, total) => {

    return [
        {
            label: t("hoje"),
            value: dashboardData.TODAY ? dashboardData.TODAY : 0,
            // percentage: "12.4",
            increase: "",
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "6", sm: "6" },
            datasets: [
                {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(0, 184, 216, 0.1)",
                    borderColor: "rgb(0, 184, 216)",
                    data: [1, 2, 1, 3, 5, 4, 7],
                },
            ],
        },
        {
            label: t("semana"),
            value: dashboardData.THIS_WEEK ? dashboardData.THIS_WEEK : 0,
            // percentage: "12.4",
            increase: "",
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "6", sm: "6" },
            datasets: [
                {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(23,198,113,0.1)",
                    borderColor: "rgb(23,198,113)",
                    data: [1, 2, 3, 3, 3, 4, 4],
                },
            ],
        },
        {
            label: t("mes"),
            value: dashboardData.THIS_MONTH ? dashboardData.THIS_MONTH : 0,
            // percentage: "3.8%",
            increase: "",
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "4", sm: "6" },
            datasets: [
                {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(255,180,0,0.1)",
                    borderColor: "rgb(255,180,0)",
                    data: [2, 3, 3, 3, 4, 3, 3],
                },
            ],
        },
        {
            label: t("ano"),
            value: dashboardData.THIS_YEAR ? dashboardData.THIS_YEAR : 0,
            // percentage: "2.71%",
            increase: false,
            decrease: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "4", sm: "6" },
            datasets: [
                {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(255,65,105,0.1)",
                    borderColor: "rgb(255,65,105)",
                    data: [1, 7, 1, 3, 1, 4, 8],
                },
            ],
        },
        {
            label: t("total"),
            value: total ? total : 0,
            // percentage: "2.4%",
            increase: false,
            decrease: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "4", sm: "6" },
            datasets: [
                {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgb(0,123,255,0.1)",
                    borderColor: "rgb(0,123,255)",
                    data: [3, 2, 3, 2, 4, 5, 4]
                },
            ],
        },
    ]
}

export { sircevSmallStats }