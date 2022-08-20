import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  MaxLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(10)
  @Matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, {
    message: 'Invalid phone number format',
  })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  roles: Role[];
}

export default RegisterDto;
