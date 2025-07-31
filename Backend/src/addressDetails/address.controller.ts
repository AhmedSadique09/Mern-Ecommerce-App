import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  async addAddress(@Body() createDto: CreateAddressDto) {
    return this.addressService.addAddress(createDto);
  }

  @Get(':userId')
  async getAddresses(@Param('userId') userId: string) {
    return this.addressService.getAddresses(userId);
  }

  @Patch(':userId/:addressId')
  async updateAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
    @Body() updateDto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(userId, addressId, updateDto);
  }

  @Delete(':userId/:addressId')
  async deleteAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.addressService.deleteAddress(userId, addressId);
  }
}
