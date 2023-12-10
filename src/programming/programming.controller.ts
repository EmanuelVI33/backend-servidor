import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProgrammingService } from './programming.service';
import { CreateProgrammingDto } from './dto/create-programming.dto';
// import { UpdateProgrammingDto } from './dto/update-programming.dto';

@Controller('programming')
export class ProgrammingController {
  constructor(private readonly programmingService: ProgrammingService) {}

  @Post()
  create(@Body() createProgrammingDto: CreateProgrammingDto) {
    return this.programmingService.create(createProgrammingDto);
  }

  @Get()
  findAll(@Body() body: { programId: number }) {
    console.log(`ProgramId: ${body.programId}`);
    return this.programmingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programmingService.findOne(+id);
  }

  @Get(':id/elements')
  getProgrammingElements(@Param('id') id: string): any {
    const programmingId = parseInt(id, 10);
    return this.programmingService.getElements(programmingId);
  }

  @Get(':id/play')
  findAllWithElement(@Param('id') id: string) {
    try {
      console.log(`Ingresooo  ${id}`);
      return this.programmingService.getAllProgrammingByProgram();
    } catch (error) {
      console.log(error);
    }
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProgrammingDto: UpdateProgrammingDto,
  // ) {
  //   return this.programmingService.update(+id, updateProgrammingDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // console.log('programming.. ' + id);
    return this.programmingService.remove(+id);
  }
}
