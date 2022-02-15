#!/usr/bin/env node
import { cyan, green, redBright } from 'chalk';
import { pastel } from 'gradient-string';

import { SUPPORTED_NODE_VERSION } from './configuration/constants/compatibility';

import { saturn } from './components/saturn';

import { app } from './app';

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

console.log(pastel.multiline(saturn()));
console.log();
console.log();
console.log(`🪐 Welcome to React Spaces! Let's get you set up with a new project.`);
console.log();

app();
