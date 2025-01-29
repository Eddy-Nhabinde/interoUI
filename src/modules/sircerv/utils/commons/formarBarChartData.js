import { colors } from "../../../../assets/colors/barChartBkColor"

export function formatBarChartData(data) {
    let lables = []
    let prints = []
    let backgroundColor = []

    if (data) {

        for (let index = 0; index < data.data.length; index++) {
            lables.push(data.data[index].orgUnitName)
            prints.push(data.data[index].total)
            backgroundColor.push(colors[index]);
        }
    }

    return { lables, prints, backgroundColor }
}