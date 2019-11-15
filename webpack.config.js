'use strict';

/* global __dirname */

const _ = require('lodash');
const frontConfig = require('../webpack-applications');
const root = __dirname;

let config = frontConfig.config;

config = _.merge({}, config, {
  entry: {
    alerts: './index.jsx'
  },
  resolve: {
    alias: {
      containers: `${root}/containers`,
      components: `${root}/components`,
      reducers: `${root}/reducers`,
      actions: `${root}/actions`
    }
  }
});

module.exports = config;
