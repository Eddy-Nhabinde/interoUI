export function getSearchParams(orgUnits) {
    if (orgUnits) {
        if (orgUnits.childrens) {
            let params = ""
            for (let index = 0; index < orgUnits.childrens.length; index++) {
                params += orgUnits.childrens[index].id + ";"
            }
            return params
        } else if (orgUnits.label == "Moçambique") {
            return 'sIPZ84RBqMM;p9UiH23JS15;wqmPoqfG93D;pPGhROE8IIC;L6z1mqFYii6;IvsKEydqOUT;f5F6xAskA05;cai3Uyc1ngZ;UN0aH8CjbZJ;coEbHyby9NV;eCer1W6aTne'
        }
        return orgUnits.id
    } else return 'sIPZ84RBqMM;pk9UiH23JS15;wqmPoqfG93D;pPGhROE8IIC;L6z1mqFYii6;IvsKEydqOUT;f5F6xAskA05;cai3Uyc1ngZ;UN0aH8CjbZJ;coEbHyby9NV;eCer1W6aTne'

}