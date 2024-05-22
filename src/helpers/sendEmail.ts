import nodemailer from "nodemailer";


export const sendEmail = async ({ to, subject, text, html }: any) => {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.email",
            port: 587,
            auth: {
              user: process.env.auth_user,
              pass: process.env.auth_password,
            },
          });
          await transporter.sendMail({
            from: "SheyJobs",
            to: to,
            subject,
            text,
            html,
          });
    } catch (error) {
        console.log(error);
        return error;
      } 
}
