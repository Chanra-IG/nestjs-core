import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { Auth0Module } from '@lib/auth0';
import { AWSModule } from '@lib/aws';
import { ConfigModule } from '@lib/config';
import { CryptoModule } from '@lib/crypto';
import { FirebaseAdminModule } from '@lib/firebase-admin';
import { GoogleCloudStorageModule } from '@lib/google-cloud-storage';
import { GraphQLRequestModule } from '@lib/graphql-request';
import { I18NModule } from '@lib/i18n';
import { IORedisModule } from '@lib/ioredis';
import { JwtModule } from '@lib/jwt';
import { KeycloakModule } from '@lib/keycloak';
import { MailerModule } from '@lib/mailer';
import { MediaStreamModule } from '@lib/media-stream';
import { MongooseModule } from '@lib/mongoose';
import { RateLimitingModule } from '@lib/rate-limiting';
import { SequelizeModule } from '@lib/sequelize';
import { SocialModule } from '@lib/social';
import { SocketModule } from '@lib/socket';
import { Tile38Module } from '@lib/tile38';
import { TwilioModule } from '@lib/twilio';
import { TypeOrmModule } from '@lib/typeorm';
import { WinstonLoggerModule } from '@lib/winston-logger';
import { WowzaModule } from '@lib/wowza';

import { ApiModule } from './api/api.module';

@Module({
  imports: [
    AWSModule,
    Auth0Module,
    ApiModule,
    ConfigModule,
    CryptoModule,
    FirebaseAdminModule,
    GoogleCloudStorageModule,
    GraphQLRequestModule,
    I18NModule,
    IORedisModule,
    KeycloakModule,
    JwtModule,
    MailerModule,
    MediaStreamModule,
    MongooseModule,
    ScheduleModule.forRoot(),
    SequelizeModule,
    SocialModule,
    SocketModule,
    TypeOrmModule,
    Tile38Module,
    TwilioModule,
    WowzaModule,
    WinstonLoggerModule,
    RateLimitingModule
  ]
})
export class ApplicationModule {}
