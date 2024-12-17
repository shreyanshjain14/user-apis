import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export class Utils {
  static async hashPassword(param: string): Promise<string> {
    return bcrypt.hash(param, 10);
  }

  static async comparePasswords(
    passwordFromUser: string,
    passwordFromDatabase: string
  ): Promise<void> {
    const isMatch = await bcrypt.compare(passwordFromUser, passwordFromDatabase);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid Credentials");
    }
  }

}
