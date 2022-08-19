import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/events/entities/event.entity';
import { Food, FoodsSchema } from './entities/food.entity';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';

class ConfigService {} //mockup config
class DevelopmentConfigService {}
class ProductionConfigService {}

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Food.name,
        schema: FoodsSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [FoodsController],
  providers: [
    {
      provide: FoodsService,
      useClass: FoodsService,
    },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
  exports: [FoodsService],
})
export class FoodsModule {}
