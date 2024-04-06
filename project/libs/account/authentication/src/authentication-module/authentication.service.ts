import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';

import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
  ) {}
  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    
    const {email, fullname, password} = dto;

    const blogUser = {
      email,
      fullname,
      avatar: '',
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password)

    await this.blogUserRepository
      .save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    return this.blogUserRepository.findById(id);
  }

  public async changePassword(dto: ChangePasswordDto): Promise<void> {
    const {id, oldPassword, newPassword} = dto;
    const userEntity = await this.blogUserRepository.findById(id);
    if (!userEntity) {
      throw new NotFoundException(`User not found`);
    }
    if (!await userEntity.comparePassword(oldPassword)) {
      throw new UnauthorizedException(`Invalid request`);
    }
    await userEntity.setPassword(newPassword);
    await this.blogUserRepository.update(userEntity);
  }
}