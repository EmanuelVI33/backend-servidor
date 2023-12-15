import { Module } from '@nestjs/common';
import { ProgramModule } from './program/program.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgrammingModule } from './programming/programming.module';
import { ElementModule } from './element/element.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './config/multer-options';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HostModule } from './host/host.module';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AudiuModule } from './audiu/audiu.module';
import { MediaFileManager } from './utils/MediaFileManager.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'programa.sqlite', // Nombre del archivo de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Esto crea automáticamente las tablas al iniciar la aplicación (solo para desarrollo)
    }),
    EventEmitterModule.forRoot(),
    MulterModule.register(multerOptions),
    ProgramModule,
    ProgrammingModule,
    ElementModule,
    ProgramModule,
    HostModule,
    ChatgptModule,
    TelegramBotModule,
    AudiuModule,
  ],
  controllers: [],
  providers: [MediaFileManager],
})
export class AppModule {}
