# auto-pki-server

[![Build Status](https://travis-ci.org/rsrdesarrollo/auto-pki-server.svg?branch=master)](https://travis-ci.org/rsrdesarrollo/auto-pki-server)
[![Dependency Status](https://david-dm.org/rsrdesarrollo/auto-pki-server.svg)](https://david-dm.org/rsrdesarrollo/auto-pki-server)
[![devDependency Status](https://david-dm.org/rsrdesarrollo/auto-pki-server/dev-status.svg)](https://david-dm.org/rsrdesarrollo/auto-pki-server#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/rsrdesarrollo/auto-pki-server/badge.svg)](https://coveralls.io/r/rsrdesarrollo/auto-pki-server)

A brand new Enrollment over Secure Transport server.

## Installation

```bash
apt install curl mongodb golan openssl git libavahi-compat-libdnssd-dev
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g concurrently bower

git clone https://github.com/rsrdesarrollo/auto-pki-server.git
cd auto-pki-server
./install.sh
. ~/.bashrc
npm start
```

