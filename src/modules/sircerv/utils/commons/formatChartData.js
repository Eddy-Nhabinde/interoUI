export function formatData(data) {
    let dados = []
    let yAxis = []

    if (data.data) {
        for (let index = 0; index < data.data.length; index++) {

            var year = data.data[index].period.substring(0, 4);
            var month = data.data[index].period.substring(4, 6);
            var day = data.data[index].period.substring(6, 8);

            let newPerido = year + '-' + month + '-' + day;
            dados.push(newPerido)
            yAxis.push(data.data[index].total)
        }
    }

    return { dados, yAxis }
}