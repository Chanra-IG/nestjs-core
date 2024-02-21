import { Inject } from '@nestjs/common';

import { HUAWEI_TOKEN } from './huawei.constant';

export const InjectHuawei = () => Inject(HUAWEI_TOKEN);
