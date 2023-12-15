import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AudiuService {
  constructor() {}

  async searchTrack(text: string) {
    const headers = {
      Accept: 'application/json',
    };

    try {
      const response = await axios.get(
        `https://blockchange-audius-discovery-02.bdnodes.net/v1/tracks/search?query=${text}&app_name=EXAMPLEAPP`,
        { headers },
      );

      const { id } = response.data.data[0];
      console.log(id);
      return id;
    } catch (error) {
      console.log(error);
      return { error: 'Hubo un error' };
    }
  }

  async getStreamTrack(id: number) {
    try {
      const response = await axios.get(
        `https://blockchange-audius-discovery-02.bdnodes.net/v1/tracks/${id}/stream?app_name=EXAMPLEAPP`,
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
