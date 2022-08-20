import { Role } from 'src/authentication/enums/role.enum';

export class CreateUserDto {
  email: string;
  firstName: string;
  password: string;
  phoneNumber: string;
  roles: Role[];
}

export default CreateUserDto;
