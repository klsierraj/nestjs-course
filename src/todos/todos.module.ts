import { Module } from '@nestjs/common';
import { TodosService } from './services/todos.service';
import { TodosController } from './controllers/todos.controller';
import { TodosRepository } from './repositories/todos.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TodosRepository])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
