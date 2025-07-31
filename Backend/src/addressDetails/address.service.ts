import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Address, AddressDocument } from './models/address.model';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { errorHandler } from '../common/utils/error.utils';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    ) { }

    // Add Address
    async addAddress(createDto: CreateAddressDto) {
        try {
            const newAddress = new this.addressModel({
                ...createDto,
                userId: new Types.ObjectId(createDto.userId),
            });
            await newAddress.save();
            return { success: true, data: newAddress };
        } catch (error) {
            throw errorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to add address', error.message);
        }
    }

    // Get Addresses
    async getAddresses(userId: string) {
        try {
            const list = await this.addressModel.find({ userId: new Types.ObjectId(userId) });
            return { success: true, data: list };
        } catch (error) {
            throw errorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch addresses', error.message);
        }
    }

    // Update Address
    async updateAddress(userId: string, addressId: string, updateDto: UpdateAddressDto) {
        try {
            const updated = await this.addressModel.findOneAndUpdate(
                { _id: new Types.ObjectId(addressId), userId: new Types.ObjectId(userId) },
                updateDto,
                { new: true },
            );

            if (!updated) throw errorHandler(HttpStatus.NOT_FOUND, 'Address not found');

            return { success: true, data: updated };
        } catch (error) {
            throw errorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to update address', error.message);
        }
    }

    // Delete Address
    async deleteAddress(userId: string, addressId: string) {
        try {
            const deleted = await this.addressModel.findOneAndDelete({
                _id: new Types.ObjectId(addressId),
                userId: new Types.ObjectId(userId),
            });

            if (!deleted) throw errorHandler(HttpStatus.NOT_FOUND, 'Address not found');

            return { success: true, message: 'Address deleted successfully!' };
        } catch (error) {
            throw errorHandler(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete address', error.message);
        }
    }
}
