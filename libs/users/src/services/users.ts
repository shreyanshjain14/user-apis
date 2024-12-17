import { Inject, Injectable } from "@nestjs/common";

import { UserLibConstants } from "../constant";
import { DocumentRepositoryContract } from "../repositories";
import { UserRepositoryContract } from "../repositories/users/contract";
import { Storage, Helpers } from '@libs/core';
import { IDocument } from "@libs/common";

@Injectable()
export class UserLibService {
  constructor(
    @Inject(UserLibConstants.USER_REPOSITORY)
    public readonly repo: UserRepositoryContract,
    @Inject(UserLibConstants.DOCUMNENT_REPOSITORY)
    public readonly documentRepo: DocumentRepositoryContract
  ) {}
  async getUploadUrls(inputs: Record<string, any>): Promise<Record<string, any>[]> {
    const disk = 'docs';
    const driver = Storage.disk(disk);
    const config = driver.getConfig();
    const client = driver.getClient();

    const urls = [];
    for (let i = 0; i < inputs.n; i++) {
      let key = Helpers.uuid();

      if (inputs.fileNames && inputs.fileNames.length > 0) {
        key = Helpers.slugify(inputs.fileNames[i]);
      }

      if (inputs.extensions && inputs.extensions.length > 0) {
        key = `${key}.${inputs.extensions[i]}`;
      }
      const path = `${inputs.path}/` + key;
      const params = { Key: path, Bucket: config.bucket, Expires: 60 * 20 };
      const url = await client.getSignedUrlPromise('putObject', params);
      const signedUrl = await Storage.generateSignedUrl(path, disk);
      urls.push({ url: `${url}`, key: path, signedUrl });
    }

    return urls;
  }
  async create(dto: IDocument): Promise<IDocument> {
    return await this.documentRepo.create(dto);
  }

  async deleteDocument(path: string) {
    return await Storage.deleteFromS3(path);
  }
}
