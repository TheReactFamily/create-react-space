import type { ITerminalLink } from '../../@types/TerminalLink';

export const terminalLink = ({ fallback, text, url }: ITerminalLink) => (fallback ? fallback(text, url) : `${text} (\u200B${url}\u200B)`);
