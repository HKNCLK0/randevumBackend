import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//TODO:Giden Mail HTML'i Düzenlenecek
export const createTicket = (req, res) => {
  const { name, surname, email, phone, selectedSubject, problemText } =
    req.body;
  try {
    const msg = {
      to: `${email}`, // Change to your recipient
      from: "noreply@em492.randevum.tech", // Change to your verified sender
      subject: `${selectedSubject} Destek`,
      html: `Kullanıcı İsim-Soyisim : ${name} ${surname} Telefon:${phone} <p>${problemText}</p>`,
    };
    sgMail
      .send(msg)
      .then(() => res.status(200).json({ status: "ok" }))
      .catch((error) => {
        res.status(403).json({ error });
      });
  } catch (error) {
    res.status(400).json(error);
  }
};
