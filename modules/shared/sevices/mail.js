import "dotenv/config.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.EMAIL_API_KEY);

export async function sendEmail({
  to,
  from = "smalec1236@gmail.com",
  subject = "",
  text = "",
  html = "",
}) {
  try {
    const message = {
      to: to,
      from: from,
      subject: subject,
      text: text,
      html: html,
    };
    await sgMail.send(message);
    console.log("Email sent");
  } catch (e) {
    console.log("Error occured: ", e.message);
    return;
  }
}

export function sendVerificationEmail({ emailTo, emailToken }) {
  sendEmail({
    to: emailTo,
    subject: "Verify your account",
    html: `<h3>Welcome!</h3><p>Thank you for joining with us. Now there's only one step left.</p><p>Please verify your email</p><p>You can do that by using those endpoints: <i><b>users/verify/${emailToken}</b></i></p>`,
  });
}
