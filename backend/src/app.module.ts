import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoModule } from './aluno/aluno.module';
import * as dotenv from 'dotenv';
import { Aluno } from './aluno/aluno.entity';
import { SecretManagerService } from './secret-manager/secret-manager.service';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (secretManager: SecretManagerService) => {
        const secretName = process.env.SECRET_NAME || 'meu-banco-secreto';
        const secrets = await secretManager.getDatabaseSecrets(secretName);

        return {
          type: 'mysql', 
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || "3306", 10),
          username: secrets.DB_USERNAME,
          password: secrets.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [Aluno],
          synchronize: process.env.NODE_ENV !== 'production', 
        };
      },
      inject: [SecretManagerService],
    }),
    AlunoModule,
  ],
  controllers: [AppController],
  providers: [AppService, SecretManagerService],
})
export class AppModule {}
