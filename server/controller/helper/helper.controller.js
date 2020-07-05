const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');

const jwt = require("jsonwebtoken");

const transpoter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);


exports.mail = async (email, authPass) => {
  console.log(email, "mail");
  sgMail.setApiKey("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");
  try {
    const msg = {
      to: email,
      from: "queues@vip.com",
      subject: "אישור הרשמה",
      html: `<p> סיסמא לאישור הרשמה   <b>${authPass}</b></p>`,
    };
    await sgMail.send(msg);
    console.log("mail sent");

    return;
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
      return;
      // return next(error);
    }
  }
}

exports.createToken = (employee) => {

  return jwt.sign(
    {
      employeeId: employee._id.toString(),
    },
    "roeeangel"
  );
};
