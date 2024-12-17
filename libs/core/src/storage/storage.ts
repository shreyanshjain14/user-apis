import { drive_v3 } from '@googleapis/drive';
import { Injectable } from '@nestjs/common';

import { StorageService } from './service';
const urlLib = require('url');

@Injectable()
export class Storage {
  static disk(disk: string) {
    return StorageService.getDriver(disk);
  }

  static generateSignedUrl(key: string, disk: string = 'docs') {
    if (!key) return null;
    const imgKey = `img_originals/${key}`;
    return StorageService.getDriver(disk).signedUrl(key, 4320);
  }

  static deleteFromS3(key: string, disk: string = 'docs') {
    if (!key) return null;
    const imgKey = `img_originals/${key}`;
    return StorageService.getDriver(disk).delete(key);
  }

  static generatePublicUrl(key: string, disk: string = 'properties') {
    return StorageService.getDriver(disk).url(key);
  }

  static async listFilesFromGDriveFolder(url: string, errField?: string): Promise<any[]> {
    // const [, , , , , folderId] = url.split('/');
    const parsedUrl = urlLib.parse(url, true);
    const pathname = parsedUrl.pathname;
    const pathnameArray = pathname.split('/');
    const folderId = pathnameArray[pathnameArray.length - 1];
    if (!folderId) {
      throw { [errField || 'driveUrl']: 'Incorrect URL' };
    }
    const client = (await Storage.disk('gdrive').getClient()) as drive_v3.Drive;
    const res = await client.files.list({
      q: `'${folderId}' in parents`,
      fields: 'nextPageToken, files(id, name, mimeType)',
      spaces: 'drive',
    });
    return res.data?.files || [];
  }

  static async downloadFileFromGDrive(fileId: string): Promise<{ image: any; mimeType: any }> {
    const client = (await Storage.disk('gdrive').getClient()) as drive_v3.Drive;
    const content = await client.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
    const image = content.data;
    const mimeType = content.headers['content-type'];
    return { image, mimeType };
  }
}
