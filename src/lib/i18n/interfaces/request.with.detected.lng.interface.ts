import { IDetectedLng } from './detected.lng.interface';

export interface IRequestWithDetectedLng extends Request, IDetectedLng {}
