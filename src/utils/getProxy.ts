import { execSync } from 'child_process';

export const getProxy = () => {
  if (process.env.https_proxy) return process.env.https_proxy;

  try {
    const httpsProxy = execSync('npm config get https-proxy').toString().trim();
    return httpsProxy !== 'null' ? httpsProxy : undefined;
  } catch (e) {
    return;
  }
};
