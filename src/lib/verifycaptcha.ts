"use server"

export async function verifyCaptcha(token: string | null) {
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`)
  const response = await res.json()
  if (response.success) { return true; } 
  else { 
    console.error("Failed Captcha") 
    return false;
} 
}