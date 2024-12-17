import { AppConfig, Command, ConsoleIO } from '@libs/core';
import { UserLibService } from '@libs/users';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
@Command("seed:admin", { desc: "Command to create admin" })
export class AdminSeeder {
  constructor(private userService: UserLibService) {}

  public async handle(_cli: ConsoleIO): Promise<void> {
    const email = await _cli.ask("Enter your email");
    const isValidEmail = await this.validateEmail(email, _cli);
    if (!isValidEmail) return;

    const name = await _cli.ask("Enter your name");
    if (!name.length) _cli.error("Please enter name");
    const password = await _cli.password("Enter your password");
    const confirmPassword = await _cli.password("Confirm your password");

    if (password !== confirmPassword) {
      _cli.error("Passwords do not match.");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //add user
    const user = await this.userService.repo.createOrUpdate(
      { email },
      {
        email: email,
        password: hashedPassword,
        name,
        role: "admin",
        status: AppConfig.get("settings.users.status.active"),
      }
    );
    _cli.info("Admin created");
    return;
  }

  async validateEmail(email: string, _cli: ConsoleIO) {
    if (!this.isEmail(email)) {
      _cli.error("Please enter a valid email.");
      return false;
    }
    if (!(await this.checkEmailAvailability(email, _cli))) {
      _cli.error("Email is already linked with some other user.");
      return false;
    }
    return true;
  }

  isEmail(email: string) {
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    let isValid = emailRegex.test(email);
    if (!isValid) return false;
    if (email.includes("+")) return false;
    return true;
  }

  async checkEmailAvailability(email: string, _cli: ConsoleIO) {
    const user = await this.userService.repo.searchOne({ email });
    if (!user) return true;
    if (!(user.role === "admin")) {
      return false;
    }
    return true;
  }
}
