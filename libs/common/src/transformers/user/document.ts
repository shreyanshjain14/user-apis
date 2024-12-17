import { Storage, Transformer } from "@libs/core";
import { IDocument } from "@libs/common/interfaces";

export class DocumentsTransformer extends Transformer {
  async transform(model: IDocument): Promise<IDocument> {
    return {
      id: model.id,
      documentSlug: await Storage.generateSignedUrl(model.documentSlug),
      ownerId: model.ownerId,
      mimeType: model.mimeType,
      description: model.description,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }
}
