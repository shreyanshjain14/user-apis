import { FileOptions, GDriveOptions } from '../interfaces';
import { drive_v3, auth } from '@googleapis/drive';

export class GoogleDrive {
  private readonly disk: string;
  private config: GDriveOptions;
  private client: drive_v3.Drive;

  constructor(disk: string, config: GDriveOptions) {
    this.disk = disk;
    this.config = config;
    const { clientEmail, privateKey, scope } = this.config;
    const authenticate = new auth.JWT(clientEmail, null, privateKey, scope);
    authenticate.authorize();
    this.client = new drive_v3.Drive({ auth: authenticate });
  }

  /**
   * Put file content to the path specified.
   *
   * @param path
   * @param fileContent
   */
  async put(path: string, fileContent: any, options?: FileOptions): Promise<any> {
    // todo
  }

  /**
   * Get Signed Urls
   * @param path
   */
  signedUrl(path: string, expireInMinutes = 20): string {
    // todo
    return '';
  }

  /**
   * Get file stored at the specified path.
   *
   * @param path
   */
  async get(path: string): Promise<any> {
    const content = await this.client.files.get({ fileId: path, alt: 'media' });
    return { Body: content.data, ContentType: content.headers['content-type'] };
  }

  /**
   * Check if file exists at the path.
   *
   * @param path
   */
  async exists(path: string): Promise<boolean> {
    return true;
  }

  /**
   * Get object's metadata
   * @param path
   */
  async getMetaData(path: string): Promise<Record<string, any> | null> {
    return {};
  }

  /**
   * Check if file is missing at the path.
   *
   * @param path
   */
  async missing(path: string): Promise<boolean> {
    return false;
  }

  /**
   * Get URL for path mentioned.
   *
   * @param path
   */
  url(path: string): string {
    return '';
  }

  /**
   * Delete file at the given path.
   *
   * @param path
   */
  async delete(path: string): Promise<boolean> {
    return true;
  }

  /**
   * Get instance of driver's client.
   */
  getClient(): drive_v3.Drive {
    return this.client;
  }

  /**
   * Get config of the driver's instance.
   */
  getConfig(): Record<string, any> {
    return this.config;
  }
}
