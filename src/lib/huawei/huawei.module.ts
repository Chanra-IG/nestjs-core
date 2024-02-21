import { Global, Module } from '@nestjs/common';

import { HuaweiProvider } from './huawei.provider';

@Global()
@Module({
  providers: [HuaweiProvider],
  exports: [HuaweiProvider]
})
export class HuaweiModule {}
