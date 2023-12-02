import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ElementService } from './element.service';
// import { CreateElementDto } from './dto/create-element.dto';
// import { UpdateElementDto } from './dto/update-element.dto';
// import { ProgrammingService } from 'src/programming/programming.service';

@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Post()
  create(@Body() createElementDto: any) {
    try {
      console.log(JSON.stringify(createElementDto));
      const createdElement = this.elementService.create(createElementDto);
      return {
        message: 'Element created successfully',
        element: createdElement,
      };
    } catch (error) {
      return { error: error.message || 'Internal Server Error' };
    }
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
