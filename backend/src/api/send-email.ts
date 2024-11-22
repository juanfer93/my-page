import nodemailer from 'nodemailer';
import { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_DEVELOP_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido, usa POST.' });
    return;
  }

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ error: 'Todos los campos son obligatorios' });
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: 'Nuevo contacto desde la página JFPI',
      html: `
        <div>
          <h2>¡Nuevo contacto desde la página JFPI!</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Correo:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
        </div>
      `,
    });

    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'No se pudo enviar el correo' });
  }
};
