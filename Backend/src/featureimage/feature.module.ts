import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature, FeatureSchema } from './models/feature.model';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Feature.name, schema: FeatureSchema }])],
    controllers: [FeatureController],
    providers: [FeatureService],
})
export class FeatureModule { }
