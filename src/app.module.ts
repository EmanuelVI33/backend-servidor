import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramModule } from './program/program.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgrammingModule } from './programming/programming.module';
import { ElementModule } from './element/element.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'programa.sqlite', // Nombre del archivo de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Esto crea automáticamente las tablas al iniciar la aplicación (solo para desarrollo)
    }),
    ProgramModule,
    ProgrammingModule,
    ElementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
