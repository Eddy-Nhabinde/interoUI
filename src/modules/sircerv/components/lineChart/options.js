export const Options = (dados, yAxis) => {

    var options = {
        grid: {
            top: 20, right: 30, bottom: 30, left: 60
        },
        xAxis: {
            type: "category",
            splitLine: {
                show: false
            },
            data: dados || ["Sem acontecimentos nas datas selecionadas!"],
        },
        yAxis: {
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            type: 'value'
        },
        series: [
            {
                data: yAxis || [],
                type: "line",
                smooth: true
            }
        ],
        tooltip: {
            trigger: "axis"
        }
    };


    return { options: options }
}