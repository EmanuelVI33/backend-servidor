import { IsNumber, IsString } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;
}
