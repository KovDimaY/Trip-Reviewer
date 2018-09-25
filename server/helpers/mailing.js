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

module.exports = {
  updateModelAndSendEmail,
};
