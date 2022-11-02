import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodosRepository } from '../repositories/todos.repository';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todosRepository.save(createTodoDto);
  }

  findAll() {
    return this.todosRepository.find();
  }

  async findOne(id: number) {
    return await this.todosRepository.findOne({
      id,
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${updateTodoDto.title} todo`;
  }

  remove(id: number) {
    return this.todosRepository.delete({ id });
  }
}
