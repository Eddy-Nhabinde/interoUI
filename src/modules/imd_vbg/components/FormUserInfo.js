import React from 'react'

const FormUserInfo = ({ varKey, varValue }) => {
    return (
        <div className="d-flex mb-3 justify-content-between">
            <h5 style={{ fontSize: 17}}><strong>{varKey}</strong> </h5>
            <h6 style={{fontSize: 17}}>{varValue}</h6>
        </div>

    )
}

export { FormUserInfo }