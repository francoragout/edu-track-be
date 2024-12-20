import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    const userId = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userId) {
      throw new NotFoundException(`The user with id: ${id} was not found`);
    }

    return userId;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`The user with id: ${id} was not found`);
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.prismaService.user.delete({ where: { id } });
    if (!user) {
      throw new NotFoundException(`The user with id: ${id} was not found`);
    }

    return user;
  }
}
