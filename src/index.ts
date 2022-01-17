#!/usr/bin/env node
import { bgCyan } from 'chalk';

import { app } from './app';

import { SUPPORTED_NODE_VERSION } from './configuration/constants/compatibility';

const nodeVersion = process.versions.node;

if (parseInt(nodeVersion) < SUPPORTED_NODE_VERSION) {
  console.error(`
    Your device is running Node ${nodeVersion} \n
    ${bgCyan.black('Create React Project')} requires Node 14 or higher. \n
    Please update your version of Node.
  `);
  process.exit(1);
}

app();
