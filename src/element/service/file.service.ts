import { Injectable, NotFoundException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  constructor() {}

  async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
    const fileName = this.generateFileName(file);
    const filePath = `${path}/${fileName}`;

    await this.saveFile(file, filePath);

    return fileName;
  }

  async getFile(path: string): Promise<Buffer> {
    try {
      const fileBuffer = fs.readFileSync(path);
      return fileBuffer;
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  private generateFileName(file: Express.Multer.File): string {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${randomName}${extname(file.originalname)}`;
  }

  private saveFile(file: Express.Multer.File, filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, file.buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
