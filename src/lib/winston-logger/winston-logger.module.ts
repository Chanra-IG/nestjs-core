import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => {
        return {
          defaultMeta: { service: 'nestjs-core' },
          format: format.combine(format.timestamp(), format.splat(), format.json()),
          transports: [
            new transports.DailyRotateFile({
              filename: `logs/%DATE%-error.log`,
              level: 'error',
              datePattern: 'YYYY-MM-DD',
              zippedArchive: false,
              maxFiles: '30d',
              maxSize: '20m'
            }),
            new transports.DailyRotateFile({
              filename: `logs/%DATE%-combined.log`,
              datePattern: 'YYYY-MM-DD',
              zippedArchive: false,
              maxFiles: '30d',
              maxSize: '20m'
            })
          ]
        };
      }
    })
  ]
})
export class WinstonLoggerModule {}
