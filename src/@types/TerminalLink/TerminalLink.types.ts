export interface ITerminalLink {
  fallback?: (text: string, url: string) => string | boolean;
  text: string;
  url: string;
}
