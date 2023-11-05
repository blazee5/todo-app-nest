import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {SignInAuthDto} from "./dto/sign-in.dto";
import {User} from "../users/entities/user.entity";
import {SignUpAuthDto} from "./dto/sign-up.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }

    async signUp(signUpAuthDto: SignUpAuthDto) {
        signUpAuthDto.password = await bcrypt.hash(signUpAuthDto.password, 10);
        const user: User = await this.usersService.create(signUpAuthDto);

        return {
            "id": user.id,
        };
    }

    async signIn(signInAuthDto: SignInAuthDto) {
        const user: User = await this.usersService.findByEmail(signInAuthDto.email);

        if (!bcrypt.compare(user.password, signInAuthDto.password)) {
            throw new UnauthorizedException();
        }

        const payload = {userId: user.id};

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
