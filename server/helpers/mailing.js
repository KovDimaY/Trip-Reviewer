const setUpdateProfileEmailOptions = function(adminMail, emailTo, name, lastname, email, newPassword) {
    let text = `The data of your profile just was changed.
        \nYour new data is the next:
        \nName: ${name}
        \nLastname: ${lastname}
        \nEmail: ${email}`;
    if (newPassword) {
        text += `\nPassword: ${newPassword}`;
    }
    text += `\n\nWarning! If you change your email, new notification will not arive to this email anymore.`;

    return {
        from: `"Admin TripReview" <${adminMail}>`,
        to: emailTo,
        subject: 'Update Profile',
        text
    };
}

const updateProfileSendEmail = function(transporter, mailOptions, res) {
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return res.json({ success: true, error, message: "Your data is updated, but the email failed to be sent" });
        } else {
            console.log('Email sent: ' + info.response);
            return res.json({ success: true, info: info.response, message: 'Your profile was successfully updated' });
        }
    });
};

const updateModelAndSendEmail = function(Model, _id, fieldsToUpdate, res, transporter, data) {
    const { adminMail, mailTo, name, lastname, email, newPassword } = data;

    Model.findByIdAndUpdate(_id, fieldsToUpdate, { new: true }, (err) => {
        if (err) return res.json({ success: false, message: err });

        const mailOptions = setUpdateProfileEmailOptions(adminMail, mailTo, name, lastname, email, newPassword);

        updateProfileSendEmail(transporter, mailOptions, res);
    });
}

module.exports = {
    updateModelAndSendEmail: updateModelAndSendEmail
}