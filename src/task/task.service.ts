import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {Task} from "./entities/task.entity";
import {DeleteResult, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TaskService {
  constructor(
      @InjectRepository(Task)
      private tasksRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask: Task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(newTask);
  }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOneBy({id});
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update({id}, updateTaskDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.tasksRepository.delete({id});
  }
}
