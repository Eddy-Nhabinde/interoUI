import React from 'react';
import { Col } from 'shards-react';

const ModalCard = ({ title, data }) => {
  return (
    <Col xs={12} sm1={12} md={6} lg={4} xl={4} className='mb-2 pl-0'>
      <div className={`modal-card  ${title}`}>
        <span className={`title`}>{title}</span>
        <span className='data'>{data}</span>
      </div>
    </Col>
  )
}

export { ModalCard }