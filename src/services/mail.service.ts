import * as aws from "aws-sdk";
import { getConfig } from "../config/index";

class MailService {
  private readonly ses: aws.SES;
  private config = getConfig();
  private SESConfig = {
    apiVersion: "2010-12-01",
    accessKeyId: this.config.aws.accessKeyId,
    secretAccessKey: this.config.aws.secretAccessKey,
    region: this.config.aws.region,
  };

  constructor() {
    this.ses = new aws.SES(this.SESConfig);
  }

  async sendMail() {
    return this.ses
      .sendEmail({
        Source: this.config.email.defaultFrom,
        Destination: {
          ToAddresses: [this.config.email.defaultTo],
        },
        Message: {
          Subject: { Charset: "UTF-8", Data: this.testEmailValues().subject },
          Body: {
            Text: { Charset: "UTF-8", Data: this.testEmailValues().text },
            Html: { Charset: "UTF-8", Data: this.testEmailValues().html },
          },
        },
        ReplyToAddresses: [this.config.email.defaultFrom],
      })
      .promise();
  }

  private testEmailValues() {
    return {
      subject: "This a test email",
      text: "This is a sample email, to test the working of the email SMTP settings",
      html: "<h4>This is a test email heading</h4> <p> This is a test email paragraph also to test the email service </p>",
    };
  }
}

export default MailService;
