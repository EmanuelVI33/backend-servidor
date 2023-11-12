import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramModule } from './program/program.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ProgramModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // Nombre del archivo de la base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Esto crea automáticamente las tablas al iniciar la aplicación (solo para desarrollo)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
