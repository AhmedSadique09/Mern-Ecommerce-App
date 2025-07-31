import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feature, FeatureDocument } from './models/feature.model';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { errorHandler } from '../common/utils/error.utils';

@Injectable()
export class FeatureService {
    constructor(
        @InjectModel(Feature.name) private featureModel: Model<FeatureDocument>,
    ) { }

    // Add new feature image
    async addFeatureImage(createFeatureDto: CreateFeatureDto) {
        try {
            const featureImage = new this.featureModel(createFeatureDto);
            await featureImage.save();
            return { success: true, data: featureImage };
        } catch (error) {
            throw errorHandler(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to add feature image',
                error.message,
            );
        }
    }

    // Get all feature images
    async getFeatureImages() {
        try {
            const images = await this.featureModel.find();
            return { success: true, data: images };
        } catch (error) {
            throw errorHandler(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to fetch feature images',
                error.message,
            );
        }
    }

    // Delete feature image
    async deleteFeatureImage(id: string) {
        try {
            const deleted = await this.featureModel.findByIdAndDelete(id);
            if (!deleted) {
                throw errorHandler(HttpStatus.NOT_FOUND, 'Feature image not found');
            }
            return { success: true, message: 'Feature image deleted successfully!' };
        } catch (error) {
            throw errorHandler(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to delete feature image',
                error.message,
            );
        }
    }
}
