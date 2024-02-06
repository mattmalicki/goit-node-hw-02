import "dotenv/config.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.EMAIL_API_KEY);

export async function sendEmail({ to, from, subject, text, html }) {
  try {
    const message = {
      to: to,
      from: from || "smalec1236@gmail.com",
      subject: subject || "",
      text: text || "",
    };
    await sgMail.send(message);
    console.log("Email sent");
  } catch (e) {
    console.log("Error occured: ", e);
    return;
  }
}

export async function sendVerificationEmail({ emailTo, emailToken }) {
  console.log("Email: ", emailTo, " . . . Token: ", emailToken);
  await sendEmail({
    to: emailTo,
    subject: "Verify your account",
    text: `Welcome! Thank you for joining with us. Now there's only one step left - you need to verify your account. To do that use this endpoint: users/verify/${emailToken}`,
  });
}