import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaFileManager {
  basePath = 'public/media';

  private static MEDIA_DIRECTORY = path.join(
    __dirname,
    '../..',
    'public',
    'media',
  );

  constructor() {
    // Crea el directorio de medios si no existe
    if (!fs.existsSync(MediaFileManager.MEDIA_DIRECTORY)) {
      fs.mkdirSync(MediaFileManager.MEDIA_DIRECTORY);
    }
  }

  async downloadAndStoreMedia(
    type: string,
    fileBuffer: any,
  ): Promise<string | null> {
    try {
      const directory = path.join(MediaFileManager.MEDIA_DIRECTORY, type);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      const { originalname } = fileBuffer;

      const id = `${uuidv4()}${originalname}`;
      const filePath = path.join(directory, id);

      fs.writeFileSync(filePath, fileBuffer.buffer);

      return `${this.basePath}/${type}/${id}`;
    } catch (error) {
      console.error(
        'Error al descargar y almacenar el archivo multimedia:',
        error,
      );
      return null;
    }
  }

  // // Método para descargar y almacenar un archivo multimedia
  // async downloadAndStoreMedia(url: string, type: string): Promise<Data | null> {
  //   try {
  //     // Verifica el tipo de multimedia y crea una ruta específica
  //     const directory = path.join(MediaFileManager.MEDIA_DIRECTORY, type);
  //     if (!fs.existsSync(directory)) {
  //       fs.mkdirSync(directory);
  //     }

  //     // const fileExtension = '.mp3';

  //     const fileExtension = fileExtensions[type];
  //     if (!fileExtension) {
  //       // Manejar un tipo no válido o desconocido
  //       return null;
  //     }

  //     const id = `${uuidv4()}${fileExtension}`; // Generar id y mantener la extensión

  //     const filePath = path.join(directory, id); // Crear ruta

  //     // Realiza la descarga y almacena el archivo
  //     await this.download(url, filePath);

  //     // Devuelve la ruta de referencia
  //     return { id, filePath };
  //   } catch (error) {
  //     console.error(
  //       'Error al descargar y almacenar el archivo multimedia:',
  //       error,
  //     );
  //     return null;
  //   }
  // }

  async download(fileUrl: string, localFilePath: string) {
    try {
      const response = await axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream', // Indica que la respuesta será un flujo de datos (stream)
      });

      // Crea un flujo de escritura para el archivo local
      const writer = fs.createWriteStream(localFilePath);

      // Pipe (conectar) el flujo de lectura de Axios al flujo de escritura del archivo local
      response.data.pipe(writer);

      await new Promise<void>((resolve, reject) => {
        writer.on('finish', () => {
          console.log(
            'Archivo descargado y almacenado con éxito en:',
            localFilePath,
          );
          resolve();
        });

        // Maneja cualquier error durante la descarga
        writer.on('error', (err) => {
          console.error('Error al descargar y almacenar el archivo:', err);
          reject(err);
        });
      });
      return localFilePath;
    } catch (error) {
      console.error('Error en la petición HTTP:', error);
      throw error;
    }
  }
}
