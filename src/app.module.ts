import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./task/entities/task.entity";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {User} from "./users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'todo',
    entities: [Task, User],
    synchronize: true,
  }),
    AuthModule,
    UsersModule,
    TaskModule,
  ],
  controllers: [],
})
export class AppModule {}
