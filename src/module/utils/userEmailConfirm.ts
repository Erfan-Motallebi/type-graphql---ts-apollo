"use strict";
import nodeMailer from "nodemailer";

export async function sendEmailConfirmation(
  email: string,
  url: string
): Promise<void> {
  let testAccount = await nodeMailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodeMailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    name: "User Confirmity",
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <Erfan.Motallebi1990@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `Hello World`, // plain text body
    html: `<a href='${url}'><h3>User Email Confirmity URL : <strong>${url}</strong></h3></a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
}
