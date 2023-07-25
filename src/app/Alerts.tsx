import React from 'react'

import getAlerts from '@/lib/getAlerts';

const Alerts = async () => {

  const alerts = await getAlerts(0,10,0);

  return (
    <>
      {alerts.map((alert: any, i: number) => {
        return (
            <div key={i}>
              {alert.title}
            </div>
        )
      })}
    </>
  )
}

export default Alerts;