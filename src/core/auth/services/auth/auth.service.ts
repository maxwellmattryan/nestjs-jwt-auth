import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from '@api/core/auth/entities/user.entity';
import { UserAlreadyExistsException } from '@api/core/auth/exceptions/auth.exception';
import { TokenPayload } from '@api/core/auth/interfaces/token-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private configService: ConfigService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    public async authenticateUser(userData: User): Promise<User> {
        const user: User = await this.userRepository.findOne({ username: userData.username });

        if(user && await bcrypt.compare(userData.password, user.password)) {
            return user;
        } else {
            return;
        }
    }

    public generateCookieWithJwtToken(user: User): string {
        const payload: TokenPayload = { id: user.id, username: user.username, email: user.email };
        const token = this.jwtService.sign(payload);
        const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');

        // CAUTION: When trying to include the 'Secure;' option, HTTPS has to be used
        // NOTE: Cookie just disappears from client-side storage on the first request's sent after it expires
        return `Authentication=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${expiresIn}`;
    }

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