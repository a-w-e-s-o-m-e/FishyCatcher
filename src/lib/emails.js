const nodemailer = require("nodemailer");
const fs = require("fs");
const smtpTransport = require("nodemailer-smtp-transport");
const { emailConfig, from, to } = require("../config");

const transporter = nodemailer.createTransport(smtpTransport(emailConfig));

const cleanFile = (content, path) => {
  console.log('cleaning', content, path);
  let pathArchive = path + '.archive';
  fs.appendFile(pathArchive, "\n" + content, err => {
    if (err) console.error("Error while archiving logs", err);
    fs.truncate(path, 0, (e) => {
      if(e) {
        console.error(e);
      }
    });
  });
};

const sendDailyReport = () => {
  transporter.sendMail(
    {
      from,
      subject: "Daily phishing report",
      text:
        "Howdy,\n\nPlease find attached to this email the daily report of the catched domains. \n\nBleepblopblop,\nDr. Fish",
      attachments: [
        {
          filename: "catched_domains.txt",
          path: "./catched_domains.txt"
        },
        {
          filename: "catched_ads_domains.txt",
          path: "./catched_ads_domains.txt"
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

  fs.readFile("catched_domains.txt", (e, data) => {
    if (e) {
      console.log(e);
    }

    cleanFile(data, "catched_domains.txt");
  });
  fs.readFile("catched_ads_domains.txt", (e, data) => {
    if (e) {
      console.log(e);
    }

    cleanFile(data, "catched_ads_domains.txt");
  });
};

exports.sendDailyReport = sendDailyReport;
