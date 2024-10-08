import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
