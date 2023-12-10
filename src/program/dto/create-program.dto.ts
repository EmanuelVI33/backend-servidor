import { IsNumber, IsString } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  name: string;

  @IsString()
  duration: string;

  @IsString()
  cover:string;

  @IsString()
  description:string;

  @IsNumber()
  host:number;
}
