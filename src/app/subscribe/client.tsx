'use client'

import React, {useState} from 'react';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Checkbox } from '@mui/material';

import styles from '../../styles/subscribe.module.scss'

const Client = () => {

    const [formData, setformData] = useState({
        email: false,
        alerts: false,
        news: false,
        events: false,
      });
      const [helperText, setHelperText] = React.useState('*You must enter your email and at least one preference');

      function validateEmail(email: string) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target)
        if (event.target.type == 'checkbox') {
            setformData({
                ...formData, [event.target.name]: event.target.checked,
              });
        }
        else if (event.target.type == 'email') {
            validateEmail(event.target.value) ? setformData({ ...formData, email: true, }) : setformData({ ...formData, email: false, })
        }
    
      };

      const { email, alerts, news, events } = formData;
      const error = !(([alerts, news, events].filter((v) => v).length > 0) && email);
      const disabledProp = {disabled: error ? true : false}
      console.log(!(([alerts, news, events].filter((v) => v).length > 0) && email))

  return (
      <div className={styles.container}>
          <div id={styles["subscribe"]}>
              <h2>Join Our Growing Community!</h2>
              <p>Become a part of Sachse&lsquo;s informed and connected community by subscribing to our email newsletter. Stay up-to-date, engaged, and involved in the exciting developments that shape our beautiful city. The aim is
                  not to bombard you with emails every single time we get something new, but to curate only the information most relevant to you and help keep you in the loop. Please keep in mind this feature is a work in progress and will be
                  rolled out accordingly pending gauged interest from community responses.
              </p>
              {error ? <div className={styles.helperText}>{helperText}</div> : ''}
              <TextField
                  onChange={handleChange}
                  name='email'
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="outlined"
              />
              <h3>Preferences:</h3>
              <FormControl
                  error={error}
                  required
                  component="fieldset"
                  sx={{ m: 3, margin: 0 }}
                  variant="standard"
              >
                  <FormGroup>
                      <FormControlLabel
                          control={
                              <Checkbox checked={alerts} onChange={handleChange} name="alerts" />
                          }
                          label="Alerts"
                      />
                      <FormControlLabel
                          control={
                              <Checkbox checked={news} onChange={handleChange} name="news" />
                          }
                          label="News"
                      />
                      <FormControlLabel
                          control={
                              <Checkbox checked={events} onChange={handleChange} name="events" />
                          }
                          label="Events"
                      />
                  </FormGroup>
              </FormControl>

              {/* <FormHelperText>{helperText}</FormHelperText> */}
              <Button variant="contained" {...disabledProp}>Submit</Button>
          </div>
      </div>
  )
}

export default Client;