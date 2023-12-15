import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Message } from 'node-telegram-bot-api';
import { Telegraf } from 'telegraf';
const { message } = require('telegraf/filters');

@Injectable()
export class TelegramBotService {
  private bot: Telegraf;

  constructor(private messageReceived: EventEmitter2) {
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
    this.bot.on(message('text'), (ctx) => {
      const message = ctx.message as Message;
      const { text } = message;
      if (text) {
        console.log('Mesnaje desde telegram: ' + text);
        this.messageReceived.emit('message_received', { text });
      }
    });
  }

  startBot() {
    this.bot.launch();
  }
}
