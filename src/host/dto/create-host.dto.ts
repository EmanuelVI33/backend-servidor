import { IsIn, IsString } from "class-validator";

export class CreateHostDto {
  @IsString()
  @IsIn(["M","F"])
  sex: string;

  @IsString()
  photoUrl: string;
}
