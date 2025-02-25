import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { SubTasksModule } from './subtasks/subtasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // 60 saniyede belirli limit
          limit: 10, // 10 istek limiti
        },
      ],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://mongodb:27017/juniorAri'),
    MulterModule.register({
      dest: './uploads',
    }),
    ProjectsModule,
    TasksModule,
    SubTasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
