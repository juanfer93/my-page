import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.TO_EMAIL,
        subject: 'Nuevo contacto desde la página JFPI',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: auto;">
            <h2 style="color: #0056b3; text-align: center;">¡Nuevo contacto desde la página JFPI!</h2>
            <p style="font-size: 16px;">Acaba de llegar un mensaje de un cliente con los siguientes datos:</p>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Nombre:</strong> ${name}</li>
              <li><strong>Correo:</strong> ${email}</li>
              <li><strong>Teléfono:</strong> ${phone}</li>
            </ul>
            <p style="font-size: 14px; color: #555;">Este correo fue enviado automáticamente desde la página web de JFPI.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <footer style="text-align: center; font-size: 12px; color: #999;">
              <p>JFPI © 2024 - Todos los derechos reservados.</p>
            </footer>
          </div>
        `,
      });

      res.status(200).json({ message: 'Correo enviado con éxito' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ error: 'No se pudo enviar el correo' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
