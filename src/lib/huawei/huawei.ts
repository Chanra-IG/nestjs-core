import { Logger } from '@nestjs/common';
import * as OBS from 'esdk-obs-nodejs';

import { HuaweiConfig } from './huawei.dto';

export class HuaweiLib {
  public obs: any;
  private logger: Logger = new Logger('HuaweiModule');

  constructor(public readonly config: HuaweiConfig) {
    this.obs = new OBS({
      access_key_id: this.config.HUAWEI_ACCESS_KEY_ID,
      secret_access_key: this.config.HUAWEI_SECRET_ACCESS_KEY,
      server: this.config.HUAWEI_OBS_SERVER
    });
    this.logger.log('Huawei loaded');
  }
}
