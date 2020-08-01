import { IsNotEmpty, isNotEmpty } from 'class-validator';
import { Roletype } from 'src/modules/role/roletype.enum';
import { UserDetails } from '../user.details.entity';
export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  roles: Roletype[];

  @IsNotEmpty()
  details: UserDetails;
}
