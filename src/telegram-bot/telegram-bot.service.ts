import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Message } from 'node-telegram-bot-api';
import { AudiuService } from 'src/audiu/audiu.service';
import { ChatgptService } from 'src/chatgpt/chatgpt.service';
import { MediaFileManager } from 'src/utils/MediaFileManager.service';
import { Telegraf } from 'telegraf';
const { message } = require('telegraf/filters');

@Injectable()
export class TelegramBotService {
  private bot: Telegraf;

  constructor(private messageReceived: EventEmitter2,
    private chatgptService: ChatgptService,
    private audiuService: AudiuService,
    private dowloadModule: MediaFileManager
  ) {
    this.bot = new Telegraf(process.env.TELEGRAM_API_KEY);
    this.setupListeners();
    this.startBot();
  }

  start() {
    this.bot.start((ctx) => {
      ctx.reply('Welcome');
    });
  }

  private setupListeners() {
    this.bot.on(message('text'), async (ctx) => {
      const message = ctx.message as Message;
      const { text } = message;
      if (text) {
        console.log('Mensaje desde telegram: ' + text);
        const chatGPTResponse = await this.chatgptService.getCompletion(text);
        //GUARDAR EN LA LISTA//
        const trackId = await this.audiuService.searchTrack(chatGPTResponse);
        const pathMusicDowloaded = await this.dowloadModule.download(`https://blockchange-audius-discovery-02.bdnodes.net/v1/tracks/${trackId}/stream?app_name=EXAMPLEAPP`, 'public/music.mp3')
        console.log(`pah Musica : ${pathMusicDowloaded}`);
        this.messageReceived.emit('message_received', { text });
        ctx.reply(chatGPTResponse);
      }
    });
  }

  startBot() {
    this.bot.launch();
  }

}
