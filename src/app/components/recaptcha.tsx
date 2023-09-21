import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/lib/verifycaptcha";
import React from 'react';

type Props = {
  setVerified: (verified: boolean) => void
}

const styles = {margin: '10px 0 0'}

const Recaptcha = ( {setVerified}: Props ) => {

    async function handleCaptchaSubmission(token: string | null) {
        const res = await verifyCaptcha(token)
        setVerified(res)
      }
      

  return (
    <div style={styles}>
        <ReCAPTCHA
                sitekey={'6LdjqDgoAAAAANRE3Obc0MWw_kIWtQaY9W6m_GgH'}
                onChange={handleCaptchaSubmission}
        />
    </div>
  )
}

export default Recaptcha;