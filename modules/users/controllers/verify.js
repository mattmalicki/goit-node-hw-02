import { User } from "../schemas/user.schema.js";
import { sendEmail } from "../../shared/sevices/mail.js";

export async function verifyToken(req, res) {
  try {
    const data = await User.find({
      verificationToken: req.params.verificationToken,
    });
    const user = data[0];
    if (!user) {
      return res.status(404).json("User not found");
    }
    user.verify = true;
    user.verificationToken = "null";
    await user.save();
    return res.status(200).json("Verification successful");
  } catch (e) {
    return res.status(500).json(e.message);
  }
}

export async function verificationEmailRequest(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json("Missing requierd field email");
    }
    const data = await User.find({ email: email });
    const user = data[0];
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (user.verify) {
      return res.status(400).json("Verification has already been passed");
    }
    await sendEmail({
      to: user.email,
      subject: "Verification request",
      text: `Hi. You've recieved this email because there has been a request to send again verification email. Ignore this email if it wasn't you. Here it is and this is your verification endpoint - users/verify/${user.verificationToken}`,
    });
    return res.status(200).json("Email has been sent");
  } catch (e) {
    return res.status(500).json("Error occured", e.message);
  }
}
