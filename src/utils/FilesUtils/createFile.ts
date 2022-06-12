import { EOL } from 'os';
import { writeFile } from 'fs-extra';

export const createFile = <T>(name: string, content: T) => writeFile(name, JSON.stringify(content, null, 2) + EOL);
