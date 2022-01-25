#!/usr/bin/env node
import { cyan, green, redBright } from 'chalk';

import { app } from './app';

import { SUPPORTED_NODE_VERSION } from './configuration/constants/compatibility';

const nodeVersion = process.versions.node;

if (parseInt(nodeVersion) < SUPPORTED_NODE_VERSION) {
  console.log(` Your device is running Node ${redBright(nodeVersion)}`);
  console.log();
  console.log(` ${cyan('Create React Space')} requires ${green('node 14')} or higher.`);
  console.log();
  console.log(' Please update your version of Node.');
  console.log();

  process.exit(1);
}

app();
