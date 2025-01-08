export interface Team {
  id: number;
  login_id: string;
}

export type GetTeamRes = Team[];

export interface PostTeamReq {
  login_id: string;
  password: string;
}

export interface DeleteTeamReq {
  id: number;
}

export interface PutTeamReq {
  id: number;
  login_id?: string;
  newPassword?: string;
}
