import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { CreateElementDto } from './dto/create-element.dto';
import { ElementsTriggerDto } from './dto/element-trigger';
// import { UpdateElementDto } from './dto/update-element.dto';
// import { ProgrammingService } from 'src/programming/programming.service';

@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createElementDto: any, @UploadedFile() file: any) {
    try {
      const createdElement = this.elementService.create({
        ...createElementDto,
        file,
      });
      return {
        message: 'Element created successfully',
        element: createdElement,
      };
    } catch (error) {
      return { error: error.message || 'Internal Server Error' };
    }
  }

  @Post('trigger')
  generateElement(@Body() elementTriggerDto: ElementsTriggerDto) {
    try {
      // console.log(elementTriggerDto);
      this.elementService.generateElement(elementTriggerDto);
    } catch (error) {
      return { error: error.message || 'Internal Server Error' };
    }
  }

  @Get('created')
  createVideo(@Body() response: any) {
    console.log(response);
  }

  @Get()
  findAll() {
    return this.elementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elementService.findOne(+id);
  }

  @Get('programming/:id')
  async getElementsByProgrammingId(@Param('id') programmingId: number) {
    try {
      const elements = await this.elementService.getElements(programmingId);
      return { elements };
    } catch (error) {
      return { error: error.message || 'Internal Server Error' };
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateElementDto: UpdateElementDto) {
  //   return this.elementService.update(+id, updateElementDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elementService.remove(+id);
  }
}
