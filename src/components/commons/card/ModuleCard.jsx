import React from 'react'
import { Card, CardBody, CardHeader, CardImg, CardSubtitle, Col } from 'shards-react';
import '../../../assets/styles/moduleCard.css'
import { useHistory } from 'react-router-dom'
import foto from '../../../assets/images/module.png'

const ModuleCard = ({ module }) => {
    const history = useHistory();

    const onSelection = () => {
        history.push(`/${module.route}`)
    }

    return (
        <Card className='module-card' style={{ maxWidth: "250px", height: 'auto', margin: "5px", padding: "0px" }}>
            <div className='info-btn'>
                <i className="material-icons">info</i>
            </div>
            <div onClick={() => onSelection()} className='module-card__onFocus-wrapper'>
                <div className='content'>
                    <span className='text-center onHover-title mb-4'><strong>{module.displayName}</strong></span>
                    <span className='module-desc text-muted'>{module.description}</span>
                </div>
            </div>
            <CardImg style={{ borderRadius: '0.625rem 0.625rem 0  0 ', margin:'7px' }} src={foto} />
            <div style={{marginBottom:'15px'}} >
                <CardHeader className='text-center card__header'>{module.displayName}</CardHeader>
            </div>
            <CardBody className='card__body pb-1'>
            </CardBody>
        </Card>
    )
}

export { ModuleCard }