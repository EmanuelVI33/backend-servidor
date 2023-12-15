import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { ChatgptModule } from 'src/chatgpt/chatgpt.module';
import { AudiuModule } from 'src/audiu/audiu.module';
import { MediaFileManager } from 'src/utils/MediaFileManager.service';

@Module({
  imports:[ChatgptModule, AudiuModule],
  providers: [TelegramBotService,MediaFileManager],
})
export class TelegramBotModule {}
