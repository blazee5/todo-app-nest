import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {SignUpAuthDto} from "../auth/dto/sign-up.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    create(createUserDto: SignUpAuthDto): Promise<User> {
        const user: User = this.userRepository.create(createUserDto);
        return this.userRepository.save(user)
    }

    findByEmail(email: string) {
        return this.userRepository.findOneBy({email})
    }
}
