const cron = require("node-cron");
const { sendDailyReport } = require("./emails");

cron.schedule("9 0 * * *", () => {
  // every day at 9am
  sendDailyReport();
});
