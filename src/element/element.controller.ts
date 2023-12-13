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
  InternalServerErrorException,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { CreateElementDto } from './dto/create-element.dto';
import { ElementsTriggerDto } from './dto/element-trigger';
// import { UpdateElementDto } from './dto/update-element.dto';
// import { ProgrammingService } from 'src/programming/programming.service';

@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) { }

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
      console.log(elementTriggerDto);
      this.elementService.generateElement(elementTriggerDto);
    } catch (error) {
      return { error: error.message || 'Internal Server Error' };
    }
  }

  @Post('gen-image') //archivo
  @UseInterceptors(FileInterceptor('image'))
  async generateImage(@UploadedFile() image, @Body('duration') duration: number) {
    try {
      const videoPath = await this.elementService.genImageByFile(image, duration);
      // Devolver la ruta del video o cualquier otra información necesaria
      return { videoPath };
    } catch (error) {
      console.error('Error al generar la imagen:', error);
      throw new InternalServerErrorException('Error al generar la imagen');
    }
  }

  @Post('gen-ima') //path
  async generateImagePath(@Body() body: any) {
    try {
      console.log(`body : ${JSON.stringify(body)}`)
      const videoPathA = await this.elementService.genImageByPath(body.image, body.duration);
      // Devolver la ruta del video o cualquier otra información necesaria
      return { videoPathA };
    } catch (error) {
      console.error('Error al generar la imagen:', error);
      throw new InternalServerErrorException('Error al generar la imagen');
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
