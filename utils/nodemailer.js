const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

const msg = {
  to: "test@example.com", // Change to your recipient
  from: "test@example.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  })
  .catch((error) => {
    console.error(error);
  });

const sendMail = (mailToSend) => {};

export default { sendMail };
