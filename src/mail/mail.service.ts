import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationMail(user: any, table: string): Promise<void> {
    const url = `${process.env.API_HOST}/api/${table}/activate/${user.activationLink}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Digital Farm Platform! Confirm your email',
      template: './confirmation',
      context: {
        name: user.fullName,
        url,
      },
    });
  }
}
