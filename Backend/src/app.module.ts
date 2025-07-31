import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CloudinaryModule } from './helper/cloudinary/cloudinary.module';
import { ProductModule } from './Products/product.module';
import { CartModule } from './Cart/cart.module';
import { AddressModule } from './addressDetails/address.module';
import { OrderModule } from './order/order.module';
import { FeatureModule } from './featureimage/feature.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    AuthModule,
    UserModule,
    CloudinaryModule,
    ProductModule,
    CartModule,
    AddressModule,
    OrderModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
