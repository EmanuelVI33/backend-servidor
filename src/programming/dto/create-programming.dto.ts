import { IsNumber, IsString } from "class-validator";

export class CreateProgrammingDto {
  @IsString()
  title: string;

  @IsString()
  startTime: string;

  @IsString()
  duration:string;

  @IsString()
  description:string;


  @IsNumber()
  programId: number;

  @IsNumber()
  host:number;

}
