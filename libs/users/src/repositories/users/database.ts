import { IUser, IUserSearchModel } from '@libs/common/interfaces';
import { DatabaseRepository, InjectModel, Pagination } from '@libs/database';
import { Injectable } from '@nestjs/common';
import { get } from 'lodash';

import { UserModel } from './../../models/users';
import { UserRepositoryContract } from './contract';

@Injectable()
export class UserRepository extends DatabaseRepository<IUser> implements UserRepositoryContract {
  @InjectModel(UserModel)
  model: UserModel;

  async searchOne(filters?: IUser): Promise<IUser> {
    const query = this.query();

    if (filters.id) query.where("id", filters.id);
    if (filters.email) query.where("email", filters.email);
    if (filters.contactMobileNumber)
      query.where("contactMobileNumber", filters.contactMobileNumber);
    const result = await query.limit(1).first();
    return result;
  }

  async search(inputs: IUserSearchModel): Promise<Pagination<IUser>> {
    const query = this.query();

    if (inputs.q) {
      query.where((b) => {
        b.where("firstName", "ilike", `%${inputs.q}%`)
          .orWhere("lastName", "ilike", `%${inputs.q}%`)
          .orWhere("email", "ilike", `%${inputs.q}%`);
      });
    }

    if (inputs.status) {
      query.where("status", inputs.status);
    }
    inputs.sort ? query.cOrderBy(inputs.sort) : query.cOrderBy("createdAt:desc");

    return get(inputs, "paginate", true)
      ? query.paginate<IUser>(inputs.page, inputs.perPage)
      : query.allPages<IUser>();
  }
}
