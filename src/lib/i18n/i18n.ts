import { I18nContext, TranslateOptions } from 'nestjs-i18n';

export class I18n {
  private static i18n: I18nContext<Record<string, unknown>> | any;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static t(key: string, options?: TranslateOptions) {
    this.i18n = I18nContext.current();
    return this.i18n.t(key, { ...options });
  }
}
