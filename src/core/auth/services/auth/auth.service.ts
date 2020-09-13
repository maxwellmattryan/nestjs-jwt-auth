import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from '@api/core/auth/entities/user.entity';
import { UserAlreadyExistsException } from '@api/core/auth/exceptions/auth.exception';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    public async registerUser(userData: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user: User = this.userRepository.create({ ...userData, password: hashedPassword });

        return await this.userRepository.save(user)
            .catch((error) => {
                if(error.code === '23505') {
                    throw new UserAlreadyExistsException();
                } else {
                    throw new InternalServerErrorException();
                }
            });
    }
}