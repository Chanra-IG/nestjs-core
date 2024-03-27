import { Inject, Injectable } from '@nestjs/common';
import { I18nService, TranslateOptions } from 'nestjs-i18n';

import { IDetectedLng } from './interfaces/detected.lng.interface';
import { Ii18nResolver } from './interfaces/i18n.resolver.interface';
import { Ii18nTranslate } from './interfaces/i18n.translate.interface';

@Injectable()
export class I18nResolverService implements Ii18nResolver {
  /**
   *
   * @param i18nTranslate
   * @param detectedLng
   */
  constructor(
    @Inject('Ii18nTranslate')
    private readonly i18nTranslate: Ii18nTranslate,
    @Inject('IDetectedLng')
    private readonly detectedLng: IDetectedLng
  ) {}

  /**
   *
   * @param key
   * @param args
   */
  translate(
    key: string,
    args?:
      | Array<
          | {
              [k: string]: any;
            }
          | string
        >
      | {
          [k: string]: any;
        }
  ): any {
    const { detectedLng = 'en' } = this.detectedLng;
    let translated: string;

    try {
      translated = this.i18nTranslate.translate(detectedLng, key, args);
      console.log('success', key);
      console.log('success', translated);
    } catch (e) {
      translated = key;
      console.log('error', translated);
    }

    return translated;
  }
}

export class I18nExtendService extends I18nService {
  /**
   *
   * @param key
   * @param args
   */
  t(object: any, options?: TranslateOptions) {
    return object;
  }
}
