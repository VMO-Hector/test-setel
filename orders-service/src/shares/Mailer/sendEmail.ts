import * as nodemailer from 'nodemailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private _transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this._transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
      requireTLS: true,
    });
  }

   sendMail(subject: string, text: string, email: string): void {
    const options = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: text,
    };
    this._transporter.sendMail(options, (error, info) => {
      if (error) {
        this.logger.error(error);
      } else {
        this.logger.log(`Message Sent ${info.response}`);
      }
    });
  }

  async sendCodeInEmail(code: string, email: string): Promise<void> {
    const html = `
        Email verification code : ${code}
        ────────────────
        Thank You!
        ────────────────
`;
    this.sendMail('AnhCaoVMO', html, email);
  }
}
