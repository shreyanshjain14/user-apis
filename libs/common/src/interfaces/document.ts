export interface IDocument {
  id?: number;
  documentSlug?: string;
  ownerId?: number;
  mimeType?: string;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
  q?: string;
  page?: number;
  perPage?: number;
  paginate?: boolean;
  status?: string | number;
}