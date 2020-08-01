import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepoitory: RoleRepository,
  ) {}

  async get(id: number): Promise<Role> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const role: Role = await this._roleRepoitory.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  async getAll(): Promise<Role[]> {
    const roles: Role[] = await this._roleRepoitory.find({
      where: { status: 'ACTIVE' },
    });

    return roles;
  }

  async create(role: Role): Promise<Role> {
    const savedRole = await this._roleRepoitory.save(role);
    return savedRole;
  }

  async update(id: number, role: Role): Promise<void> {
    await this._roleRepoitory.update(id, role);
    //return this._mapperService.map<Role, Role>(updatedRole, new Role());
  }

  async delete(id: number): Promise<void> {
    const roleExists = await this._roleRepoitory.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!roleExists) {
      throw new NotFoundException();
    }

    await this._roleRepoitory.update(id, { status: 'INACTIVE' });
  }
}
