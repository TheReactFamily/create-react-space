import type { Link } from 'types/Link';

export const terminalLink = ({ fallback, text, url }: Link) => (fallback ? fallback(text, url) : `${text} (\u200B${url}\u200B)`);
