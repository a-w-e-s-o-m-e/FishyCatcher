const nodemailer = require("nodemailer");
const fs = require("fs");
const smtpTransport = require("nodemailer-smtp-transport");
const { emailConfig, from, to } = require("./config");

const transporter = nodemailer.createTransport(smtpTransport(emailConfig));

const cleanFile = content => {
  fs.appendFile("../catched_domains_archive.txt", "\n" + content, err => {
    if (err) console.error("Error while archiving logs", err);
    fs.writeFile("../catched_domains.txt", "", e => {
      if (e) console.error(e);
    });
  });
};

const sendDailyReport = () => {
  transporter.sendMail(
    {
      from,
      subject: "Daily phishing report",
      text:
        "Howdy,\n\nPlease find attached to this email the daily report of the catched emails. \n\nBleepblopblop,\nDr. Fish",
      attachments: [
        {
          filename: "../catched_domains.txt"
        }
      ],
      to
    },
    (e, info) => {
      if (e) {
        return console.log("Error sending the daily report: ", e);
      }
      console.log("Message %s sent: %s", info.messageId, info.response);
    }
  );

  fs.readFile("../catched_domains.txt", (e, data) => {
    if (e) {
      console.log(e);
    }

    cleanFile(data);
  });
};

exports.sendDailyReport = sendDailyReport;
