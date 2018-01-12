const CertStreamClient = require("./cert_stream_client_improved/");
const ora = require("ora");
const { reportCerts } = require("./report");
const settings = require("../config");
require("./cron");

const startCertsStream = () => {

  const spinner = ora("Connecting to certstream").start();
  let domains = 0;
  let currentDomains = 0;

  let client = new CertStreamClient(message => {
    let stringifiedSubject = "";
    let stringifiedAllDomains = "";

    if (
      message &&
      message.data &&
      message.data.leaf_cert &&
      message.data.leaf_cert.subject
    )
      stringifiedSubject = JSON.stringify(message.data.leaf_cert.subject);

    if (
      message &&
      message.data &&
      message.data.leaf_cert &&
      message.data.leaf_cert.all_domains
    )
      stringifiedAllDomains = JSON.stringify(message.data.leaf_cert.all_domains);

    if (
      settings.domainRegex.test(stringifiedSubject) ||
      settings.domainRegex.test(stringifiedAllDomains)
    ) {
      reportCerts(message.data.leaf_cert);
    }

    domains++;
  });

  setInterval(() => {
    currentDomains = domains;
    spinner.text = `Inspecting domains... ${currentDomains} per second `;
    domains = 0;
  }, 1000);

  client.connect();

}

exports.startCertsStream = startCertsStream;
