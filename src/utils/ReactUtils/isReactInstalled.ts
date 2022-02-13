export function isReactInstalled(appPackage: { dependencies?: { ['react-dom']?: string; ['react']?: string } }) {
  const dependencies = appPackage.dependencies || {};

  return typeof dependencies['react'] !== 'undefined' && typeof dependencies['react-dom'] !== 'undefined';
}
