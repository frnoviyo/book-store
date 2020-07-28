import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entiy';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
