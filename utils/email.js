const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2.Define the email options
  const mailOptions = {
    from: 'Vignesh ks<viki@natours.io>',
    to: options.email,
    subject: options.subject,
    message: options.message,
    html: `<p>${options.message.replace(/\n/g, '<br>')}</p>`,
  };
  // 3.Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
