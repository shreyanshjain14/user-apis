import { AppConfig } from "@libs/core";
import {
  Exists,
  IsEqualToProp,
  IsUnique,
  IsValidEmail,
  IsValueFromConfig,
} from "@libs/core/validator";
import {
  IsEnum,
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsMobilePhone("en-IN", {}, { message: "Invalid phone number" })
  @IsUnique({ table: "users", column: "contactMobileNumber" })
  contactMobileNumber: string;

  @IsNotEmpty()
  @IsValidEmail()
  @IsUnique({ table: "users", column: "email" })
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(8, 20)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEqualToProp("password")
  @IsString()
  confirmPassword: string;
}
export class LoginDto {
  @IsNotEmpty()
  @Exists({ table: "users", column: "email" })
  @ValidateIf(
    (obj) => obj && obj.loginType == AppConfig.get("settings.loginType.email")
  )
  email: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf(
    (obj) => obj && obj.loginType == AppConfig.get("settings.loginType.email")
  )
  password: string;
}

export class GetDocumentDto {
  @IsOptional()
  status: number;

  @IsOptional()
  @Exists({ table: "documents", column: "id" })
  id?: number;
}

export class CreateDocumentDto {
  @IsString()
  documentSlug: string;

  @IsOptional()
  @IsString()
  mimeType: string;

  @IsOptional()
  @IsString()
  filePath: string;

  @IsOptional()
  @IsString()
  fileUrl: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateDocumentDto {
  @IsString()
  description?: string;

  @Exists({ table: "documents", column: "id" })
  id?: number;
}

export class MediaGenerateLinksDto {
  @IsString()
  @IsNotEmpty()
  n: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsOptional()
  @IsIn(["docs"])
  disk: string;

  @IsOptional()
  extensions: string[];

  @IsOptional()
  fileNames: string[];
}

export class ListUsersDto {
  @IsOptional()
  @IsValueFromConfig({ key: 'settings.users.status' })
  status: number;
}


export class AssignRoleDto {
  @IsEnum({ editor: 'editor', viewer: 'viewer' })
  role: | 'editor' | 'viewer';

  @Exists({ table: 'users', column: 'id' })
  id: number;
}