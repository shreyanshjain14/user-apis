import { Transformer } from '@libs/core';
import { IUser } from '@libs/common/interfaces';

export class UserTransformer extends Transformer {
  async transform(user: IUser): Promise<IUser> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      contactMobileNumber: user.contactMobileNumber,
      //profilePictureSlug: Storage.generateSignedUrl(user.profilePictureSlug),  // for profile picture to be uploade on aws
      status: user.status,
      tncAgreed: user.tncAgreed,
      gender: user.gender,
      token: user.token,
    };
  }
}
