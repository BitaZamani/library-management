import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { supabaseAdmin } from "./src/services/supabaseAdminClient.js";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.post("/api/createUser", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }
    res.status(200).json({
      authData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.post("/api/updateemail", async (req, res) => {
  const { userId, newEmail } = req.body;

  try {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      email: newEmail,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ success: true, message: "ایمیل به روزرسانی شد." });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/api/resetpassword", async (req, res) => {
  const { email } = req.body;
  const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(200).json({ message: "Password reset email sent successfully!" });
});

app.post("/api/updatepassword", async (req, res) => {
  const { accessToken, newPassword } = req.body;
  const { error } = await supabaseAdmin.auth.updateUser(
    {
      password: newPassword,
    },
    { accessToken }
  );
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(200).json({ message: "Password reset successfully!" });
});

app.listen("3000", () => {
  console.log("server is runing.");
});
