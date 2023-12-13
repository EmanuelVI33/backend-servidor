import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ProgramService } from './program.service';
import { UpdateProgramDto } from './dto/update-program.dto';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/cover',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `${uniqueSuffix}${extension}`;
          cb(null, filename);
        },
      }),
    }),
  )
  create(@UploadedFile() file, @Body('data') data: string) {
    // console.log(file);
    // const updatedPath = `cover/${file.filename}`;
    console.log(`data : ${JSON.stringify(data)}`);
    const createProgramDto = JSON.parse(data);
    createProgramDto.cover = file.filename;
    console.log(createProgramDto);

    return this.programService.create(createProgramDto);
  }

  @Get()
  findAll() {
    // console.log('Holaaa');
    return this.programService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programService.update(+id, updateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programService.remove(+id);
  }

  @Get(':id/programming')
  async getProgrammingsByProgramId(@Param('id') id: number) {
    return this.programService.getProgrammingsByProgramId(id);
  }
}
