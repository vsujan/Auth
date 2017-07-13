import boom from 'boom';
import nodemailer from 'nodemailer';
import { sprintf } from 'sprintf-js';
import HttpStatus from 'http-status-codes';
import ses from 'nodemailer-ses-transport';
import config from '../config/config';
import * as email from '../constant/email';

/**
 * Send reset password email with reset link.
 *
 * @param params
 * @param type
 * @returns {Promise}
 */
export async function sendResetPasswordMail(params, type) {
  let messageInfo = getMessageInfo(type, params);
  let mailOptions = {
    from: config.ses.senderAddress,
    to: params.userEmail,
    subject: messageInfo.subject,
    html: messageInfo.body
  };
  let transporter = getTransporter();

  await sendMail(transporter, mailOptions);
}

/**
 * Return transporter object.
 *
 */
function getTransporter() {
  return nodemailer.createTransport(ses({
    accessKeyId: config.ses.accessKey,
    secretAccessKey: config.ses.secretKey
  }));
}

/**
 * Return message information.
 *
 * @param type
 * @param messageParams
 * @returns {{subject, body: string}}
 */
function getMessageInfo(type, messageParams) {
  if (type === config.ses.resetPasswordMail) {
      return {
          subject: email.resetPasswordSubject,
          body: `${sprintf(`${email.resetPasswordBody}`, messageParams)}`
      };
  }
}

/**
 * Send mail to user.
 *
 * @param transporter
 * @param mailOptions
 * @returns {Promise}
 */
function sendMail(transporter, mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(boom.create(HttpStatus.INTERNAL_SERVER_ERROR, error));
      }
      resolve(info);
    });
  });
}
