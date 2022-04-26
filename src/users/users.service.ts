import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ id });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.findOneOrFail({ id });
    const result = await this.userRepository.save({
      ...user,
      ...updateUserInput,
    });
    return result;
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    return result.affected === 1 ? true : false;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }
}
