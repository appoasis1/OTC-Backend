import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  const { pdf } = await readBody(event);
  //console.log("payload is", pdf);

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "marion.hudson@ethereal.email",
      pass: "qyW9Q4ASQZSJq4EVAT",
    },
  });
  
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Nyasha" <marion.hudson@ethereal.email>',
      to: "nyashakata1@gmail.com",
      subject: "Email Test",
      text: "Hello, I am testing this email to see if it is working.",
      attachments: [
        {
          filename: "document.pdf",
          content: pdf.split(";base64,").pop(),
          encoding: "base64",
        },
      ],
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  
    // Result to return
    const result = {
      success: true,
      messageId: info.messageId,
    };
    console.log(result);
  
  } catch (error) {
    console.log(error);
  
    // Error result to return
    const errorResult = {
      success: false,
      error: error.message,
    };
    console.log(errorResult);
  }
});
