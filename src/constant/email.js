import config from '../config/config';

export const resetPasswordSubject = config.ses.mailSubject;

export const resetPasswordBody = `
  Hello <b>%(userName)s</b>,
  <br><br>
  A request to change password for email: <b>%(userEmail)s</b> has been requested on  <b>%(queryDate)s</b>.. 
  <br><br>
  <a href=%(link)s>Click this link to reset your password.</a>
  <br><br>
  <b>${config.ses.mailFooter}</b>.
`;