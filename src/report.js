const axios = require("axios");
const fs = require("fs");
const settings = require("./config");

const report = data => {
  let allDomains = [];
  let subject = false;
  let reportValue = "";
  let emoji = "";

  if (data && data.all_domains) {
    allDomains = data.all_domains.filter(value =>
      settings.domainRegex.test(value)
    );
  }
  if (data && data.subject) {
    subject = settings.domainRegex.test(data.subject);
  }

  if (allDomains && allDomains.length) {
    reportValue = allDomains.join(" ");
  }

  if (subject) {
    reportValue += " " + data.subject;
  }

  if ( // if the domains contains both of the two words, make it noticeable with emojis
    settings.doubleWordMatch &&
    reportValue.includes(settings.firstWord) &&
    reportValue.includes(settings.secondWord)
  ) {
    emoji = "⚠️⚠️ ️";
  }

  sendWebhook(reportValue, emoji);
};

const sendWebhook = (domains, emoji = "") => {
  console.log(` -> reporting this domains: ${domains}`);
  axios
    .post(
      "https://hooks.slack.com/services/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",
      {
        text: `${emoji}Found potential suspicious domain(s): \n\n ${domains}`
      }
    )
    .catch(error => {
      console.log(error);
    });

  fs.appendFile("../catched_domains.txt", "\n" + domains, err => {
    if (err) console.error("Error while saving on file", err);
  });
};

exports.report = report;
