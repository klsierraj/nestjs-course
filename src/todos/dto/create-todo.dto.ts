import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Title of todo',
    type: 'string',
    example: ' Take break',
  })
  title: string;
}
