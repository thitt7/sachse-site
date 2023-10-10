import React from 'react'
import Client from './client';

import getAlerts from '@/lib/getAlerts';

const Alerts = async () => {

  const alerts = await getAlerts(undefined, 0, 10, 0);

  return (
    <Client alerts={alerts}/>
  )
}

export default Alerts;