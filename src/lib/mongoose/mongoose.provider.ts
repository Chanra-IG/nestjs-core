import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

// import * as schema from '@schemas';

import { MONGOOSE_TOKEN } from './mongoose.constant';
import { MongooseConfig } from './mongoose.dto';
import { ConfigService } from '../config';

const logger = new Logger('MongooseModule');

export const MongooseProvider = {
  inject: [ConfigService],
  provide: MONGOOSE_TOKEN,
  useFactory: async (configService: ConfigService) => {
    const { MONGO_URI } = configService.validate('MongooseModule', MongooseConfig);
    // https://mongoosejs.com/docs/deprecations
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    } as mongoose.ConnectOptions);

    if (mongoose.connection.readyState === 1) {
      logger.log('Connection has been established successfully.');
    } else {
      logger.error('Unable to connect to the database:');
    }
  }
};

// export const SchemaProviders = Object.values(schema)
//   .filter(x => x.prototype instanceof mongoose.Model)
//   .map<FactoryProvider>((model: any) => ({
//     provide: getModelToken(model.modelName),
//     useFactory: () => model
//   }));
