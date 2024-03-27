export interface FindOneOpt {
  name?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  email?: string;
  organizationId?: number;
  positionId?: string;
  roleId?: string;
  status?: string;
}

export interface FindAndCountAllOpt extends FindOneOpt {
  limit: number;
  offset: number;
}
