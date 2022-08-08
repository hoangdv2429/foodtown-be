import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './foods/foods.module';

@Module({
  imports: [
    FoodsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/foodtown-mongo'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
