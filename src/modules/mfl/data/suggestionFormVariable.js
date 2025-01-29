const variables = (options, formType) => [
    {
        title: "Província",
        valueType: "LIST",
        placeholder: "província",
        id: "province",
        options: options.provinces
    },
    {
        title: "Distrito",
        valueType: "LIST",
        placeholder: "distrito",
        options: options.district,
        id: "district",
    },
    ...(formType === "update-suggestion" ? [{
        title: "Unidade Sanitaria",
        valueType: "LIST",
        placeholder: "unidade sanitaria",
        options: options.facility,
        id: "ou",
    }]:[]),
    {
        title: "Nome(Designação)",
        valueType: "TEXT",
        id: "name",
        placeholder: "nome da unidade sanitária",
    },
    {
        title: "Short Name",
        valueType: "TEXT",
        id: "shortName",
        placeholder: "short name",
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
        options: options.cfts,
        placeholder: "classificação"
    }, {
        title: "Nome do utilizador",
        valueType: "TEXT",
        id: "requente",
        placeholder: "nome",
    },
    {
        title: "Email do utilizador",
        valueType: "EMAIL",
        id: "email",
        placeholder: "email",
    },
    {
        title: "Contacto do utilizador",
        valueType: "TEXT",
        id: "phone",
        placeholder: "contacto"
    },
]

export { variables }