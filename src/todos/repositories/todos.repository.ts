import { EntityRepository, Repository } from 'typeorm';
import { Todos } from '../entities/todos.entity';

@EntityRepository(Todos)
export class TodosRepository extends Repository<Todos> {
  constructor() {
    super();
  }
}
