import { Transformer } from "@libs/core";
import { IDocument } from "@libs/common/interfaces";

export class IngestionTransformer extends Transformer {
  async transform(model: IDocument): Promise<IDocument> {
    return {
      id: model.id,
      status: model.status
    };
  }
}
