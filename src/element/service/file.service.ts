import * as fs from 'fs';
import axios from 'axios';

// @Injectable()
export class FileService {
  static async downloadAndSaveVideo(
    url: string,
    destinationPath: string,
  ): Promise<void> {
    try {
      const response = await axios.get(url, { responseType: 'stream' });
      const writer = fs.createWriteStream(destinationPath);

      return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      throw new Error(`Error downloading and saving video: ${error.message}`);
    }
  }
}

// export class FileService {
//   constructor() {}

//   async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
//     const fileName = this.generateFileName(file);
//     const filePath = `${path}/${fileName}`;

//     await this.saveFile(file, filePath);

//     return fileName;
//   }

//   async getFile(path: string): Promise<Buffer> {
//     try {
//       const fileBuffer = fs.readFileSync(path);
//       return fileBuffer;
//     } catch (error) {
//       throw new NotFoundException('File not found');
//     }
//   }

//   private generateFileName(file: Express.Multer.File): string {
//     const randomName = Array(32)
//       .fill(null)
//       .map(() => Math.round(Math.random() * 16).toString(16))
//       .join('');
//     return `${randomName}${extname(file.originalname)}`;
//   }

//   private saveFile(file: Express.Multer.File, filePath: string): Promise<void> {
//     return new Promise((resolve, reject) => {
//       fs.writeFile(filePath, file.buffer, (error) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve();
//         }
//       });
//     });
//   }
// }
