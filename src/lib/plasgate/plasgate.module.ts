import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { PlasgateCloudProvider } from './plasgate.provider';

@Global()
@Module({
  imports: [HttpModule.register({})],
  providers: [PlasgateCloudProvider],
  exports: [PlasgateCloudProvider]
})
export class PlasgateModule {}
