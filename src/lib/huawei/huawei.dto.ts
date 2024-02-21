import { IsNotEmpty, IsString } from 'class-validator';

import { IsOptionalString } from '@common';

export class HuaweiConfig {
  @IsOptionalString()
  @IsString()
  HUAWEI_ACCESS_KEY_ID!: string;

  @IsOptionalString()
  @IsString()
  HUAWEI_SECRET_ACCESS_KEY!: string;

  @IsNotEmpty()
  @IsString()
  HUAWEI_OBS_SERVER!: string;

  @IsNotEmpty()
  @IsString()
  HUAWEI_BUCKET!: string;

  @IsNotEmpty()
  @IsString()
  HUAWEI_OCR_PROJECT_ID!: string;

  @IsNotEmpty()
  @IsString()
  HUAWEI_FRS_PROJECT_ID!: string;

  getTempUrl(fileName: string) {
    const host = `${this.HUAWEI_OBS_SERVER.replace('//', `//${this.HUAWEI_BUCKET}.`)}`;
    return `${host}/${fileName}`;
  }
}
