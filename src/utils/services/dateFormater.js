import dateFormat from 'dateformat'

const formaterToIsoDate = (date) => {
    console.log(date)
    let formatt = date.toString().split("-")
    return formatt.length > 1 ? date : dateFormat(date, 'yyyy-mm-dd');
}

export { formaterToIsoDate }