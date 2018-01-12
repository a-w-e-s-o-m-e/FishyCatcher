const Nightmare = require('nightmare');
const settings = require("../config");
const { sendWebhookAds } = require("./report");


let foundDomains = [];

const done = () => {
  console.log('\n[Ads Scraping] We are done with Nightmare');
  console.log('[Ads Scraping] Ads found: ', foundDomains.length);
  if(foundDomains.length) {
    if(settings.reportAll || foundDomains.findIndex((el) => el.match(settings.domainRegex)) > -1){
      console.log('Ads list: ', foundDomains.join(' , '));
      sendWebhookAds(foundDomains)
    }
  }
};


const runGoogleSearch = (domain) => {
  const nightmare = Nightmare({ show: true });

  return nightmare
    .goto(domain)
    .wait(5000)
    .inject('js', 'src/lib/jquery/jquery.min.js')
    .evaluate(() => $('.ads-visurl').find('cite').toArray().map((cite) => cite.innerHTML))
    .end()
    .then((domains) => {
      if (domains.length) {
        domains.forEach((domain) => {
          if(!foundDomains.includes(domain)){
            foundDomains.push(domain)
          }
        });
      }
      return nightmare.end()
    })
    .catch((error) => {
      console.error('Search failed:', error);
      return nightmare.end()
    });
};

const runAdSearches = async () => {
  await runGoogleSearch('https://www.google.de/search?q=bitwala');
  await runGoogleSearch('https://www.google.com/search?q=bitwala');
  done();
};

exports.runAdSearches = runAdSearches;
