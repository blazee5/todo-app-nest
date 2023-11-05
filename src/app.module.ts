import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./task/entities/task.entity";

@Module({
  imports: [TaskModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'todo',
    entities: [Task],
    synchronize: true,
  })],
  controllers: [],
  providers: [AppService]
})
export class AppModule {}
