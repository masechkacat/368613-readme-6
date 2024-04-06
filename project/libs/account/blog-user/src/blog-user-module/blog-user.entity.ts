import { Entity } from '@project/core';
import { StorableEntity, AuthUser } from '@project/core';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constants';


export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public avatar: string;
  public email: string;
  public fullname: string;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (! user) {
      return;
    }

    this.id = user.id; //?? this.id;
    this.avatar = user.avatar;
    this.email = user.email;
    this.fullname = user.fullname;
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      fullname: this.fullname,
      avatar: this.avatar,
      passwordHash: this.passwordHash,
    }
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}