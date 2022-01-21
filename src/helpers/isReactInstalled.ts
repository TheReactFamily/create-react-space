interface appPackage {
  dependencies?: {
    ['react-dom']?: string;
    ['react']?: string;
  };
}

export function isReactInstalled(appPackage: appPackage) {
  const dependencies = appPackage.dependencies || {};

  return typeof dependencies['react'] !== 'undefined' && typeof dependencies['react-dom'] !== 'undefined';
}
