export const getPackageInfo = (installPackage: string) => {
  return Promise.resolve({ name: installPackage });
};
