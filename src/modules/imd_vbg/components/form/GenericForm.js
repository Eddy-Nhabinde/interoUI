import React from 'react'
import { InputCheckbox, InputPassword, InputSelect, InputText, InputTextarea } from './Inputs';

const GenericForm = (props) => {

    const { inputType } = props;

    //console.log(inputType)

    switch (inputType) {
        case 'TEXT': case 'EMAIL': case 'number':
            return (
                <InputText {...props} />
            );
        case 'boolean': case 'true_only':
            return (
                <InputCheckbox {...props} />
            );
        case 'LIST':
            return (
                <InputSelect {...props} />
            );
        case 'LONG_TEXT':
            return (
                <InputTextarea {...props} />
            );
            case 'PASSWORD':
                return (
                    <InputPassword {...props} />
                )
        default: return null;
    }
}

export { GenericForm }