import cors from 'cors';
import nodemailer from 'nodemailer';
import { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';

dotenv.config();

const corsMiddleware = cors({
  origin: process.env.FRONT_DEVELOP_URL, 
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async (req: VercelRequest, res: VercelResponse) => {
  // Aplicar middleware de CORS
  corsMiddleware(req, res, (err) => {
    if (err) {
      console.error('Error en CORS:', err);
      res.status(500).json({ error: 'Error en configuración de CORS' });
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

    transporter
      .sendMail({
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
      })
      .then(() => {
        res.status(200).json({ message: 'Correo enviado con éxito' });
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'No se pudo enviar el correo' });
      });
  });
};
