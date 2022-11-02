import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { TodosRepository } from '../repositories/todos.repository';
import { TodosStub } from '../stubs/todos.stub';
import { when } from 'jest-when';

/* Mocks */
type TodosRepositoryMock = Partial<Record<keyof TodosRepository, jest.Mock>>;

const todosRepositoryMock = (): TodosRepositoryMock => ({
  findOne: jest.fn(),
});

describe('TodosService', () => {
  let service: TodosService;
  let todosRepositoryMocked: TodosRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: TodosRepository,
          useValue: todosRepositoryMock(),
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    todosRepositoryMocked = module.get(TodosRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('I can todo by id', async () => {
      when(todosRepositoryMocked.findOne).calledWith({ id: 1 }).mockReturnValue(TodosStub.repository.findOne);
      const response = await service.findOne(1);
      console.log(response);
      expect(response).toEqual(TodosStub.service.findOne);
    });
  });
});
