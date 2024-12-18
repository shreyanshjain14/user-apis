import { IDocument, IUser } from "@libs/common";
import { Pagination } from "@libs/database";
import { UserLibService } from "@libs/users";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  AssignRoleDto,
  MediaGenerateLinksDto,
  UpdateDocumentDto,
} from "../dtos/user";

@Injectable()
export class UserApiService {
  constructor(private readonly service: UserLibService) {}

  async getAllDocuments(
    inputs: IUser,
    user: IUser
  ): Promise<Pagination<IDocument>> {
    return await this.service.documentRepo.search(inputs, user.id);
  }

  async getDocumentsById(inputs: IUser, user: IUser): Promise<IDocument> {
    let document = await this.service.documentRepo.searchOne(inputs, user.id);
    if (!document) {
      throw new BadRequestException("Invalid document Id");
    } else {
      return document;
    }
  }
  async addDocuments(inputs: IDocument, user: IUser): Promise<IDocument> {
    return await this.service.documentRepo.create({
      ...inputs,
      ownerId: user.id,
    });
  }

  async updateDocuments(
    inputs: UpdateDocumentDto,
    user: IUser
  ): Promise<IDocument> {
    let document = await this.service.documentRepo.searchOne(
      {
        id: inputs.id,
      },
      user.id
    );
    if (!document) {
      throw new BadRequestException("Invalid document Id");
    }
    return (await this.service.documentRepo.updateAndReturn(
      { id: inputs.id },
      inputs
    )) as IDocument;
  }

  async deleteDocumentById(inputs: IUser, user: IUser): Promise<boolean> {
    let document = await this.service.documentRepo.searchOne(inputs, user.id);
    if (!document) {
      throw new BadRequestException("Invalid document Id");
    } else {
      await this.service.deleteDocument(document.documentSlug); // delete from S3
      return await this.service.documentRepo.deleteWhere({ id: inputs.id }); // or we can chnage the status as inactive(soft delete)
    }
  }

  async getUploadUrls(
    validParams: MediaGenerateLinksDto,
    user: IUser
  ): Promise<any> {
    return this.service.getUploadUrls(validParams);
  }

  async getAllUsers(inputs: IUser): Promise<Pagination<IUser>> {
    return await this.service.repo.search(inputs);
  }

  async assignRole(inputs: AssignRoleDto) {
    let user = await this.service.repo.search({ id: inputs.id });
    if (!user) throw new NotFoundException("User not found");
    return (await this.service.repo.updateAndReturn(
      { id: inputs.id },
      { role: inputs.role }
    )) as IUser;
  }
}
