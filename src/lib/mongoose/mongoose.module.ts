import { Global, Module } from '@nestjs/common';

import { MongooseProvider } from './mongoose.provider';

@Global()
@Module({
  providers: [
    MongooseProvider
    // ...SchemaProviders
  ],
  exports: [
    MongooseProvider
    // ...SchemaProviders
  ]
})
export class MongooseModule {}
