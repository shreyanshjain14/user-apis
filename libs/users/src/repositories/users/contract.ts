import { IUserSearchModel } from '@libs/common/interfaces';
import { IUser } from '@libs/common/interfaces/user';
import { Pagination, RepositoryContract } from '@libs/database';

export interface UserRepositoryContract extends RepositoryContract<IUser> {
  searchOne(params?: IUser): Promise<IUser>;
  search(params?: IUserSearchModel): Promise<Pagination<IUser>>;
}
