import React, { useState } from 'react';
import { Col, FormCheckbox, FormGroup, FormInput, FormSelect, FormTextarea, InputGroup, InputGroupAddon, InputGroupText } from 'shards-react';

const InputText = (props) => {
    return (
        <Col className={props.col || "col-lg-6 mb-3 mt-2"}>
            <FormGroup>
                <label className='mb-2'>{props.title}</label>
                <FormInput type={props.inputType} {...props} />
            </FormGroup>
        </Col>
    )
}

const InputSelect = (props) => {
    //console.log(props)
    return (
        <Col className={props.col || "col-lg-6 mb-3 mt-2"}>
            <h6 className='mb-2'>{props.title}</h6>
            <FormSelect {...props}>
                <option value=''>{props.placeholder}</option>
                {props.hasOwnProperty("options") && props.options.map(option =>
                    <option value={option.id || option.code} id={option.id || option.code}>{option.name || option.id}</option>
                )}
            </FormSelect>
        </Col>
    )
}

const InputCheckbox = (props) => {
    return (
        <Col className={props.col || "col-lg-6 mb-3 mt-2"}>
            <FormCheckbox {...props}>
            </FormCheckbox>
        </Col>
    )
}

const InputTextarea = (props) => {
    return (
        <Col className={props.col || "col-lg-6 mb-3 mt-2"}>
            <FormTextarea {...props} />
        </Col>
    )
}

const InputPassword = (props) => {

    const [visible, setVisible] = useState(true);

    return (
        <Col className={props.col || "col-lg-6 mb-3 mt-2"}>
            <label className='mb-2'>{props.title}</label>
            <InputGroup>
                <FormInput
                    type={visible ? "password" : "text"}
                    {...props}
                />
                <InputGroupAddon type="append">
                    <InputGroupText
                        onClick={() => setVisible(!visible)}
                    >
                        {!visible ? (
                            <i
                                className="material-icons"
                                style={{ cursor: "pointer" }}
                            >
                                visibility
                            </i>
                        ) : (
                            <i
                                className="material-icons"
                                style={{ cursor: "pointer" }}
                            >
                                visibility_off
                            </i>
                        )}
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </Col>
    )
}


export { InputText, InputSelect, InputCheckbox, InputTextarea, InputPassword }