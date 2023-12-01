import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';

@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Post()
  create(@Body() createElementDto: any) {
    // const j = JSON.stringify(createElementDto);
    // console.log(j);
    const createdElement = this.elementService.create(createElementDto);
    return { message: 'Element created successfully', element: createdElement };
  }

  @Get()
  findAll() {
    return this.elementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElementDto: UpdateElementDto) {
    return this.elementService.update(+id, updateElementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elementService.remove(+id);
  }
}
