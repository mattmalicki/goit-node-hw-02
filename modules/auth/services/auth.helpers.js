import gravatar from "gravatar";
import { nanoid } from "nanoid";
import { User } from "../../users/schemas/user.schema.js";
import { sendVerificationEmail } from "../../shared/services/mail.js";

async function signupUser(body) {
  const { email, password } = body;
  if (await User.findOne({ email })) {
    return { error: "email in use" };
  }
  const user = new User({ email });
  user.setPassword(password);
  const avatarURL = gravatar.url(email, { s: 250, protocol: "https" });
  avatarURL && user.setAvatarUrl(avatarURL);
  const verificationToken = nanoid();
  user.verificationToken = verificationToken;
  sendVerificationEmail({
    emailTo: user.email,
    emailToken: verificationToken,
  });
  await user.save();
  return user;
}

async function loginUser(body) {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user || !user.validatePassword(password)) {
    return { error: "Email or password incorrect." };
  }
  return user;
}

async function logoutUser(id) {
  const user = await User.findById(id);
  if (!user || !user.token) {
    return { error: "Unauthorized" };
  }
  return user;
}

async function currentUser(id) {
  const user = await User.findById(id);
  if (!user) {
    return { error: "Unauthorized" };
  }
  return { email: user.email, subscription: user.subscription };
}

export { signupUser, loginUser, logoutUser, currentUser };
