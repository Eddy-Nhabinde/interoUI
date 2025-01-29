const variables = (options) => [
    {
        title: "Província",
        valueType: "LIST",
        placeholder: "província",
        id: "province",
        options:options.provinces
    },
    {
        title: "Distrito",
        valueType: "LIST",
        placeholder: "distrito",
        id: "district",
        options:options.district
    },
    {
        title: "Nome(Designação)",
        valueType: "TEXT",
        id: "name",
        placeholder: "nome da unidade sanitária",
    },
    {
        title: "Código",
        valueType: "TEXT",
        id: "code",
        placeholder: "código da us",
    },
    {
        title: "Classificação",
        valueType: "LIST",
        id: "classification",
        options:options.cfts,
        placeholder: "classificação"
    },
]

export { variables }