import { HuaweiLib } from './huawei';
import { HUAWEI_TOKEN } from './huawei.constant';
import { HuaweiConfig } from './huawei.dto';
import { ConfigService } from '../config';

export const HuaweiProvider = {
  inject: [ConfigService],
  provide: HUAWEI_TOKEN,
  useFactory: (configService: ConfigService) => {
    const config = configService.validate('HuaweiModule', HuaweiConfig);
    return new HuaweiLib(config);
  }
};
