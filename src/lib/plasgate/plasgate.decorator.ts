import { Inject } from '@nestjs/common';

import { PLASGATE_TOKEN } from './plasgate.constant';

export const InjectPlasgate = () => Inject(PLASGATE_TOKEN);
