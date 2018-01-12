const cron = require("node-cron");
const { sendDailyReport } = require("./emails");
const { runAdSearches } = require("./adScraper");

cron.schedule("9 0 * * *", () => {
  // every day at 9am
  sendDailyReport();
});

cron.schedule("0 */5 * * *", () => {
  // every 5 hours
  runAdSearches();
});
