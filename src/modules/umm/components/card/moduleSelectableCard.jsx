import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col } from 'shards-react'
import { Checkbox } from 'primereact/checkbox';


const ModuleSelectableCard = (props) => {
    return (
        <Col lg={2} className='pr-0'>
            <Card className='moduleSelectableCard-card'>
                <CardHeader className='moduleSelectableCard-header'><span>{props.title}</span><Checkbox {...props} inputId="binary" /></CardHeader>
                <CardBody>
                    <CardTitle></CardTitle>
                    <p>Lorem ipsum dolor sit amet.</p>
                </CardBody>
            </Card>
        </Col>
    )
}

export { ModuleSelectableCard }