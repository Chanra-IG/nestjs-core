import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import * as https from 'https';
import { Observable } from 'rxjs';

import * as I from './interfaces/plasgate.interface';
import { PlasgateConfig } from './plasgate.dto';
import { ConfigService } from '../config';

/**
 *  New SMS Gateway Plasgate Cloud...
 */
export class PlasgateService {
  private privateKey = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpService
  ) {
    const config = this.configService.validate('PlasgateModule', PlasgateConfig);

    this.privateKey = config.PLASGATE_PRIVATE_KEY;
    this.http.axiosRef.defaults.baseURL = config.CLOUD_PLASGATE_API;
    this.http.axiosRef.defaults.headers['X-Secret'] = config.PLASGATE_X_KEY;
    this.http.axiosRef.defaults.headers['Content-Type'] = 'application/json';
    this.http.axiosRef.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

    // https://github.com/axios/axios/issues/1600#issuecomment-454013644
    this.http.axiosRef.interceptors.response.use(
      response => response, // response.data
      error => Promise.reject(error.response)
    );
  }

  async sendSms(param: I.CreatePlasgateOption) {
    return this.wrapper(
      this.http.post<any>(`/rest/send?private_key=${this.privateKey}`, {
        sender: param?.sender,
        to: param?.to?.replace('+', ''),
        content: param?.content
      })
    );
  }

  // send multi sms
  async sendMultiSms(param?: I.CreatePlasgateOptions) {
    return this.wrapper(
      this.http.post<any>(`/rest/batch-send?private_key=${this.privateKey}`, {
        globals: { sender: param?.sender },
        messages: [
          {
            to: param?.to,
            content: param?.content
          }
        ]
      })
    );
  }

  async wrapper<T>(req: Observable<AxiosResponse<T>>) {
    try {
      return req.toPromise().then(x => x?.data);
    } catch (error) {
      console.log('error occur when sending sms ======== ', error);
    }
  }
}
