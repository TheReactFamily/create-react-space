export const isUsingYarn = () => (process.env.npm_config_user_agent || '').indexOf('yarn') === 0;
