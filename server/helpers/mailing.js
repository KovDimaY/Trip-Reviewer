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
    <div style="padding: 0 25px; max-width: 700px; margin: auto;">
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
      border-top: 5px solid #bfbfbf;
      color: #808080;
      text-align: center;"
    >
        Copyright © Dmytro Kovalenko ;)
    </div>
  </div>
`;

const generateProfileUpdateTemplate = (name, lastname, email, newPassword, user) => `
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
    <div style="padding: 0 25px; max-width: 700px; margin: auto;">
      <h2 style="text-align: center; color: black;">Profile update</h2>

      <p style="color: black;">Dear <b>${user.name} ${user.lastname}</b>!</p>
      <p style="color: black;">You are receiving this email because the data of your profile was changed.</p>
      <p style="color: black;">Your new data is: </p>
      <div style="background-color: #f2f2f2; padding: 10px 30px;">
        <p style="color: black;">Name: <b>${name}</b></p>
        <p style="color: black;">Last name: <b>${lastname}</b></p>
        <p style="color: black;">Email/Login: <b>${email}</b></p>
        ${newPassword ? `<p style="color: black;">Password: <b>${newPassword}</b></p>` : ''}
      </div>
      <p style="color: black;">
        <b style="color: orange;">Warning!</b>
        If you change your email, new notification will not arive to the current email anymore.
      </p>
      <p style="color: red;
        text-align: center;
        font-weight: bold;"
      >
        If you get this email but you were not changing you profile - your profile is in danger.
        Change your password ASAP in the settings section of your profile page!
      </p>

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
      border-top: 5px solid #bfbfbf;
      color: #808080;
      text-align: center;"
    >
        Copyright © Dmytro Kovalenko ;)
    </div>
  </div>
`;

const setUpdateProfileEmailOptions = (
  adminMail,
  emailTo,
  name,
  lastname,
  email,
  newPassword,
  user
) => ({
  from: `"Admin TripReview" <${adminMail}>`,
  to: emailTo,
  subject: 'Update Profile',
  html: generateProfileUpdateTemplate(name, lastname, email, newPassword, user),
});

const updateProfileSendEmail = (transporter, mailOptions, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error); // eslint-disable-line no-console
      return res.json({
        success: true,
        error,
        message: 'Your data is updated, but the email failed to be sent',
      });
    }
    console.log(`Email sent: ${info.response}`); // eslint-disable-line no-console
    return res.json({
      success: true,
      info: info.response,
      message: 'Your profile was successfully updated',
    });
  });
};

const updateModelAndSendEmail = (Model, _id, fieldsToUpdate, res, transporter, data, user) => {
  const { adminMail, mailTo, name, lastname, email, newPassword } = data;

  Model.findByIdAndUpdate(_id, fieldsToUpdate, { new: true, runValidators: true }, err => {
    if (err && err.code === 11000) {
      return res.json({
        success: false,
        error: {
          errors: {
            email: { message: 'This email already exists' },
          },
        },
      });
    } else if (err) {
      return res.json({ success: false, error: err });
    }

    const mailOptions = setUpdateProfileEmailOptions(
      adminMail,
      mailTo,
      name,
      lastname,
      email,
      newPassword,
      user
    );

    return updateProfileSendEmail(transporter, mailOptions, res);
  });
};

module.exports = {
  updateModelAndSendEmail,
  generateResetPasswordTemplate,
};
