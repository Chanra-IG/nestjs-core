import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  I18nService,
  QueryResolver
} from 'nestjs-i18n';
import * as path from 'path';

import { I18nResolverService } from './i18n.service';
import { IRequestWithDetectedLng } from './interfaces/request.with.detected.lng.interface';

export const DetectedLngProvider: FactoryProvider = {
  provide: 'IDetectedLng',
  useFactory: (request): IRequestWithDetectedLng => {
    return request;
  },
  inject: [REQUEST]
};

export const ResolverProvider = {
  provide: 'Ii18nResolver',
  useExisting: I18nResolverService,
  scope: Scope.REQUEST
};

export const I18nServiceProvider = {
  provide: 'Ii18nTranslate',
  useExisting: I18nService
};

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      // formatter: (template: string, ...args: any[]) => template,
      loaderOptions: {
        /**
         * The I18nModule is a global module.
         * This means you'll only need to register the module once (in the root module).
         * After that it's accessible throughout the whole application.
         */
        path: path.join(__dirname, '../../i18n/'),
        watch: true // enables live reloading 🎉.
      },
      resolvers: [
        new QueryResolver(['lang']),
        new HeaderResolver(['x-language']),
        AcceptLanguageResolver
      ]
    })
  ],
  providers: [I18nResolverService, DetectedLngProvider, ResolverProvider, I18nServiceProvider],
  exports: [I18nResolverService]
})
export class I18NModule {}
