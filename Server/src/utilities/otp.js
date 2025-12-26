import twilio from "twilio"


const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

// function to generate 6 digit random otp
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}


export {
client,
  generateOTP,
}