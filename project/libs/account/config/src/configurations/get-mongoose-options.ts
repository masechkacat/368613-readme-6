import { getMongoConnectionString } from '@project/helpers';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('mongo.user'),
          password: config.get<string>('mongo.password'),
          host: config.get<string>('mongo.host'),
          port: config.get<string>('mongo.port'),
          authDatabase: config.get<string>('mongo.authBase'),
          databaseName: config.get<string>('mongo.name'),
        })
      }
    },
    inject: [ConfigService]
  }
}
