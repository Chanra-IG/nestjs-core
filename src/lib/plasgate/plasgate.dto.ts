import { IsString } from 'class-validator';

export class PlasgateConfig {
  @IsString()
  CLOUD_PLASGATE_API!: string;

  @IsString()
  PLASGATE_X_KEY!: string;

  @IsString()
  PLASGATE_PRIVATE_KEY!: string;
}
