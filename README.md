# FishyCatcher

<p align="center">
  <img src="https://github.com/bitwala/fishyCatcher/blob/master/img/meta.png?raw=true" data-canonical-src="https://github.com/bitwala/fishyCatcher/blob/master/img/meta.png?raw=true" style="text-align:center;" />
</p>

FishyCatcher is a bot that detects suspicious new domains that match certain regex on the Certstream (A simple service for getting data from the Certificate Transparency Log (CTL) network in real time) and sends a message on Slack and a daily report via email.

## Quick start

- Rename the `config_sample.js` into `config.js` modifying it with your changes. You can write multiple Regex by piping them.
- Run `npm install` to install the packages
- Run `npm start` to start the application
- Enjoy watching the domains stream that match your regex.

## Why?

We wanted to react on phishing attacks before they even happen.

## How?

FishyCatcher catches all the domains that matches the regex from the `config.js` in the [Certstream](https://certstream.calidog.io/) from Cali Dog Security. If the the regex matches with the current inspected domain, it triggers Slack webhook.
Also an email report is sent daily.
