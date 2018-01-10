exports.domainRegex = /_your_regex_/;

exports.doubleWordMatch = true; //add an emoji to the message if the following two words are matched
exports.firstWord = "first word";
exports.secondWord = "second word";

exports.emailConfig = {
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "the.from.emailaddress@gmail.com",
    pass: "the_email_password"
  }
};
exports.from = '"Fishy Catcher Bot" <the.from.emailaddress@gmail.com>';
exports.to = "your.email.address@example.com";

exports.slackWebhook = "https://hooks.slack.com/your_secret_url";
