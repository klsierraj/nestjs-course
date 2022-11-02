import * as path from 'path';
import * as dotenv from 'dotenv';

const dotenvPath = path.resolve(process.cwd(), `./.env`);
dotenv.config({ path: dotenvPath });
