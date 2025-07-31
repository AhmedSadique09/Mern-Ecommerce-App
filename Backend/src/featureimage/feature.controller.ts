import { Controller, Post, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('features')
export class FeatureController {
    constructor(private readonly featureService: FeatureService) { }

    // Add Feature Image (Admin Only)
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async addFeatureImage(@Body() createFeatureDto: CreateFeatureDto) {
        return this.featureService.addFeatureImage(createFeatureDto);
    }

    // Get All Feature Images (Public)
    @Get()
    async getFeatureImages() {
        return this.featureService.getFeatureImages();
    }

    // Delete Feature Image (Admin Only)
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async deleteFeatureImage(@Param('id') id: string) {
        return this.featureService.deleteFeatureImage(id);
    }
}
