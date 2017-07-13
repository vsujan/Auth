export const resetPasswordSubject = 'North Seattle Network - Forgot Password!';

export const resetPasswordBody = `
  Hello <b>%(userName)s</b>,
  <br><br>
  A request to change password for email: <b>%(userEmail)s</b> has been requested on  <b>%(queryDate)s</b>.. 
  <br><br>
  <a href=%(link)s>Click this link to reset your password.</a>
  <br><br>
  <b>The North Seattle Network Team</b>.
`;