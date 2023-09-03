import React from 'react'
import Link from 'next/link';

import styles from '../../../styles/home.module.scss'

const Subscribe = () => {
  return (
    <div id={styles["subscribe"]}>
      <Link href={'/subscribe'}>
        <h3>Subscribe</h3>
      </Link>
      <div className={styles.container}>
        <article>
          <p><strong>Stay Informed</strong>: Get the latest updates on news, announcements, and community initiatives.</p>
          <p><strong>Never Miss an Event</strong>: Stay updated on exciting local events and gatherings.</p>
          <p><strong>Stay Safe with Alerts</strong>: Receive timely safety alerts and advisories.</p>
          <p><strong>Job Opportunities</strong>: Explore the latest job listings in Sachse.</p>
          <p><strong>Resources</strong>: Access a collection of helpful links for the city, county, and state, including election information.</p>
        </article>
        <Link href={'/subscribe'}><button>More Details</button></Link>
      </div>
    </div>
  )
}

export default Subscribe