

const onParamChange = (event, setId, history, paramName) => {
    const url = new URL(window.location);
    console.log(url)
    const queryParams = new URLSearchParams(url.search);
    setId(event.target.value);
    if (event.target.value === "todos") {
        url.searchParams.delete(paramName);
        history.replace({
            search: queryParams.toString()
        })
    } else {
        url.searchParams.set(paramName, event.target.value);
        history.push(url.search);
    }
}

const onDataParamsChange = (history, startDate, endDate) => {
    const url = new URL(window.location);
    const queryParams = new URLSearchParams(url.search);
    url.searchParams.delete(startDate);
    url.searchParams.delete(endDate);
    history.replace({
        search: queryParams.toString()
    })
}

export { onParamChange, onDataParamsChange }