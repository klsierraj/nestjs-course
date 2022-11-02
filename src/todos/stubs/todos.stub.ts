export abstract class TodosStub {
  static repository = {
    findOne: {
      title: 'take break',
      id: 1,
      createdAt: '2022-05-26T09:02:51.438Z',
      updatedAt: '2022-05-26T09:02:51.438Z',
    },
  };
  static service = {
    findOne: this.repository.findOne,
  };
  static controller = {
    findOne: this.service.findOne,
  };
}
