import dns from 'dns';
import url from 'url';

import { getProxy } from './getProxy';
import { isUsingYarn } from './isUsingYarn';

export const isOnline = () => {
  const useYarn = isUsingYarn();

  if (!useYarn) return Promise.resolve(true);

  return new Promise(resolve => {
    dns.lookup('registry.yarnpkg.com', error => {
      let proxy;
      if (error != null && (proxy = getProxy())) {
        dns.lookup(url.parse(proxy).hostname!, proxyError => {
          resolve(proxyError == null);
        });
      } else {
        resolve(error == null);
      }
    });
  });
};
