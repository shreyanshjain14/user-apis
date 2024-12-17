import { IDocument } from "@libs/common/interfaces/document";
import { DatabaseRepository, InjectModel, Pagination } from "@libs/database";
import { DocumentModel } from "@libs/users/models";
import { Injectable } from "@nestjs/common";
import { get } from "lodash";

import { DocumentRepositoryContract } from "./contract";

@Injectable()
export class DocumentRepository
  extends DatabaseRepository<IDocument>
  implements DocumentRepositoryContract
{
  @InjectModel(DocumentModel)
  model: DocumentModel;

  async searchOne(filters?: IDocument, userId?: number): Promise<IDocument> {
    const query = this.query();

    if (filters.id) query.where("id", filters.id);
    if (userId) {
      query.where("ownerId", userId);
    }
    const result = await query.limit(1).first();
    return result;
  }

  async search(inputs: IDocument, userId?: number): Promise<Pagination<IDocument>> {
    const query = this.query();

    if (inputs.q) {
      query.where((b) => {
        b.where("description", "ilike", `%${inputs.q}%`);
      });
    }

    if (inputs.id) {
      query.where("id", inputs.id);
    }
    if (userId) {
      query.where("ownerId", userId);
    }

    return get(inputs, "paginate", true)
      ? query.paginate<IDocument>(inputs.page, inputs.perPage)
      : query.allPages<IDocument>();
  }
}
