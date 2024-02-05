import "dotenv/config.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.EMAIL_API_KEY);

export async function sendEmail(
  to,
  from = "smalec1236@gmail.com",
  subject = "",
  text = "",
  html = ""
) {
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
