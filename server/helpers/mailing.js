const setUpdateProfileEmailOptions = (adminMail, emailTo, name, lastname, email, newPassword) => {
  let text = `The data of your profile just was changed.
        \nYour new data is the next:
        \nName: ${name}
        \nLastname: ${lastname}
        \nEmail: ${email}`;
  if (newPassword) {
    text += `\nPassword: ${newPassword}`;
  }
  text += '\n\nWarning! If you change your email, new notification will not arive to this email anymore.';

  return {
    from: `"Admin TripReview" <${adminMail}>`,
    to: emailTo,
    subject: 'Update Profile',
    text,
  };
};

const updateProfileSendEmail = (transporter, mailOptions, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error); // eslint-disable-line no-console
      return res.json({ success: true, error, message: 'Your data is updated, but the email failed to be sent' });
    }
    console.log(`Email sent: ${info.response}`); // eslint-disable-line no-console
    return res.json({ success: true, info: info.response, message: 'Your profile was successfully updated' });
  });
};

const updateModelAndSendEmail = (Model, _id, fieldsToUpdate, res, transporter, data) => {
  const {
    adminMail, mailTo, name, lastname, email, newPassword,
  } = data;

  Model.findByIdAndUpdate(_id, fieldsToUpdate, { new: true, runValidators: true }, (err) => {
    if (err) return res.json({ success: false, error: err });

    const mailOptions = setUpdateProfileEmailOptions(
      adminMail, mailTo, name, lastname, email, newPassword,
    );

    return updateProfileSendEmail(transporter, mailOptions, res);
  });
};

const generateResetPasswordTemplate = (user, password) => `
  <div style="font-family: sans-serif;">
    <div style="text-align: center;
      font-size: 28px;
      color: #ffffff;
      border-bottom: 6px solid #0495a8;
      display: block;
      padding: 10px;
      background: #00BCD4;"
    >
      Travel Stories
    </div>
    <div style="padding: 0 50px; max-width: 700px; margin: auto;">
      <h2 style="text-align: center; color: black;">Password recovery</h2>

      <p style="color: black;">Dear <b>${user.name} ${user.lastname}</b>!</p>
      <p style="color: black;">You are receiving this email because you have requested a new password for this email.</p>
      <p style="color: black;">Your new password is: <b>${password}</b></p>
      <p style="color: black;">Now you can access your account with the password provided and change it for the new one in the settings of your profile.</p>
      <p style="color: black;">
        I would appreciate a lot if you provide your feedback via
        <a href="https://github.com/KovDimaY/Trip-Reviewer" target="_blank" style="font-weight: 600; color: #02bcd4;">GitHub</a>, 
        <a href="https://www.linkedin.com/in/kovalenkodmytro" target="_blank" style="font-weight: 600; color: #02bcd4;">LinkedIn</a> or
        <a href="https://www.facebook.com/dmytro.kovalenko.1004" target="_blank" style="font-weight: 600; color: #02bcd4;">Facebook</a>. 
      </p>
      <p style="text-align: center;
        font-size: 24px;
        color: black;
        margin-top: 50px;"
      >
        I wish you a good day and thank you for using my project! 😇
      </p>
    </div>
    <div style="padding: 20px;
      margin-top: 50px;
      background-color: #f2f2f2;
      -webkit-box-shadow: 0px -5px 0px #bfbfbf;
      box-shadow: 0px -5px 0px #bfbfbf;
      color: #808080;
      text-align: center;"
    >
        Copyright © Dmytro Kovalenko ;)
    </div>
  </div>
`;

module.exports = {
  updateModelAndSendEmail,
  generateResetPasswordTemplate,
};
