import React from "react";
import { Card, CardBody } from "shards-react";
import '../../../../assets/styles/dashboard.css'
import classNames from "classnames";
import { useHistory } from 'react-router-dom'


const DashboardCard = ({ bgColor, icone, label, shortName }) => {

  const history = useHistory();

  const labelClasses = classNames(
    "stats-small__label",
    "text-uppercase",
    "title-span"
  );

  const redirectToTable = () => {
    history.push(`/umm/umm-linelist?module=${shortName}`)
  }

  return (
    <Card small style={{ height: 'auto' }}>
      <div style={{ backgroundColor: bgColor }} className="module-icon">
        <i className="material-icons">{icone}</i>
      </div>
      <CardBody onClick={() => redirectToTable()} className='card-dashboard'>
        <span className={labelClasses}>{label}</span>
        <div className="role-container my-1">
          <div className="role-icon">
            <i className="material-icons">remove_red_eye</i>
          </div>
          <div className="role-desc">
            <span className="role-desc-label">Views</span>
            <span className="role-desc-label__value text-muted">2.5k</span>
          </div>
        </div>

        <div className="role-container mb-1">
          <div className="role-icon">
            <i className="material-icons">work</i>
          </div>
          <div className="role-desc">
            <span className="role-desc-label">Managers</span>
            <span className="role-desc-label__value text-muted">2.5k</span>
          </div>
        </div>

        <div className="role-container mb-1">
          <div className="role-icon">
            <i className="material-icons">lock</i>
          </div>
          <div className="role-desc">
            <span className="role-desc-label">Admins</span>
            <span className="role-desc-label__value text-muted">2.5k</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export { DashboardCard }