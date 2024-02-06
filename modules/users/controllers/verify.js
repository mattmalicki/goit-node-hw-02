import { User } from "../schemas/user.schema.js";

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
