import { SortableSchema } from '@libs/database';

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  contactMobileNumber?: string;
  password?: string;
  profilePictureSlug?: string;
  status?: number;
  tncAgreed?: boolean;
  gender?: number;
  role?: string;
  token?: string;
}

export interface IUserSearchModel extends SortableSchema {
  id?:number;
  q?: string;
  status?: number;
  page?: number;
  perPage?: number;
  paginate?: boolean;
}
