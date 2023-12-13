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
    MulterModule.register(multerOptions),
    ProgramModule,
    ProgrammingModule,
    ElementModule,
    ProgramModule,
    HostModule,
    ChatgptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
