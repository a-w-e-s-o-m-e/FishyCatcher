require("./lib/cron");
const {startCertsStream} = require("./lib/certScarper");
const { runAdSearches } = require("./lib/adScraper");



console.log(`


  ______ _     _            _____      _       _               
 |  ____(_)   | |          / ____|    | |     | |              
 | |__   _ ___| |__  _   _| |     __ _| |_ ___| |__   ___ _ __ 
 |  __| | / __| '_ \\| | | | |    / _\\\` | __/ __| '_ \\ / _ \\ '__|
 | |    | \\__ \\ | | | |_| | |___| (_| | || (__| | | |  __/ |   
 |_|    |_|___/_| |_|\\__, |\\_____\\__,_|\\__\\___|_| |_|\\___|_|   
                      __/ |                                    
                     |___/                                     

 Preventing phishing before it even happens...

`);


startCertsStream();
runAdSearches();

