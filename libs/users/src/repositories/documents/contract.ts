import { IDocument } from "@libs/common/interfaces/document";
import { Pagination, RepositoryContract } from "@libs/database";

export interface DocumentRepositoryContract extends RepositoryContract<IDocument> {
  searchOne(params?: IDocument,userId?: number): Promise<IDocument>;
  search(params?: IDocument, userId?: number): Promise<Pagination<IDocument>>;
}
