import React from 'react'
import { FormInput, InputGroup} from 'shards-react'

const Input = (props) => {

    return (
        <InputGroup className='mb-2'>
            <FormInput {...props} />
        </InputGroup>
    )
}

export default Input