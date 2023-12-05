import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DIdService {
  private webhookUrl: string = `${process.env.BASE_URL}/element/created`;

  setWebhook(url: string): void {
    this.webhookUrl = url;
  }

  async generateVideo(text: string): Promise<string> {
    console.log(process.env.D_ID_URL);
    const options = {
      method: 'POST',
      url: `${process.env.D_ID_URL}/talks`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${process.env.API_KEY_D_ID}`,
      },
      data: {
        script: {
          type: 'text',
          subtitles: 'false',
          provider: { type: 'microsoft', voice_id: 'en-US-JennyNeural' },
          ssml: 'false',
          input: text,
        },
        config: { fluent: 'false', pad_audio: '0.0' },
        source_url:
          'https://create-images-results.d-id.com/api_docs/assets/noelle.jpeg',
        webhook: this.webhookUrl,
      },
    };

    try {
      const response = await axios(options);
      console.log(`Respuesta: ${response}`);
      const { id } = response.data;
      console.log(`Id generado: ${id}`);
      return id;
    } catch (error) {
      // Maneja errores aquí según tus necesidades
      console.error('Error al llamar a la API de D-ID:', error.response.data);
      throw error;
    }
  }
}
