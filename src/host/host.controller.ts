import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';

import { HostService } from './host.service';

const s3 = new S3Client();

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerS3({
        s3: s3,
        bucket: 'topicos-2023',
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          cb(null, Date.now().toString());
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file, @Body('sex') sex: string) {
    console.log('File uploaded:', file);
    // return { url: file.location };
    return this.hostService.create({ sex, photoUrl: file.location });
  }

  // @Post()
  // create(@Body() createHostDto: CreateHostDto) {
  //   return this.hostService.create(createHostDto);
  // }

  @Get()
  findAll() {
    return this.hostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostService.findOne(+id);
  }
}
