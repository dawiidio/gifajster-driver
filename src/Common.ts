import { readFileSync, accessSync } from 'fs';
import { join } from 'path';

const PATH = join(__dirname, '../package.json');

interface PackageInfo {
    version: string
    name: string
}

export function getPackageInfo(): PackageInfo {
    accessSync(PATH);

    const {
        name, version
    }: PackageInfo = JSON.parse(readFileSync(PATH).toString());

    return {
        name, version
    }
}
