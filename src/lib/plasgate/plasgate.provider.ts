import { HttpService } from '@nestjs/axios';

import { PlasgateService } from './plasgate';
import { PLASGATE_TOKEN } from './plasgate.constant';
import { ConfigService } from '../config';

export const PlasgateCloudProvider = {
  inject: [ConfigService, HttpService],
  provide: PLASGATE_TOKEN,
  useFactory: (configService: ConfigService, http: HttpService) =>
    new PlasgateService(configService, http)
};
