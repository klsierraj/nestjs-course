import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from '../services/todos.service';
import { when } from 'jest-when';

/* Stubs */
import { TodosStub } from '../stubs/todos.stub';

/* Mocks */
type TodosServiceMock = Partial<Record<keyof TodosService, jest.Mock>>;
const todosServiceMock = (): TodosServiceMock => ({
  findOne: jest.fn(),
});
describe('TodosController', () => {
  let controller: TodosController;
  let todosServiceMocked: TodosServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: todosServiceMock(),
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    todosServiceMocked = module.get(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('I can get one todo', async () => {
      when(todosServiceMocked.findOne).calledWith(1).mockReturnValue(TodosStub.repository.findOne);
      const response = await controller.findOne('1');
      expect(response).toEqual(TodosStub.controller.findOne);
    });
  });
});
