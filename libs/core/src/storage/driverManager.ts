import { StorageDriver } from './interfaces';
import { Local, S3Storage } from './drivers';
import { GoogleDrive } from './drivers/gdrive';

export class DriverManager {
  private readonly driverMap: { [key: string]: any } = {
    local: Local,
    s3: S3Storage,
    gdrive: GoogleDrive,
  };

  getDriver(disk: string, config: Record<string, any>): StorageDriver {
    const driver = this.driverMap[config.driver];
    return new driver(disk, config);
  }
}
