#!/usr/bin/env node
import { app } from './app';

import { SUPPORTED_NODE_VERSION } from './configuration/constants/compatibility';

import { outdatedNodeVersion } from './validations/outdatedNodeVersion';

const nodeVersion = process.versions.node;

if (parseInt(nodeVersion) < SUPPORTED_NODE_VERSION) {
  outdatedNodeVersion(nodeVersion);
}

app();
