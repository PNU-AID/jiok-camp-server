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
  [key: string]: any;
  id: number;
}

export interface PutTeamReq {
  id: number;
  login_id?: string;
  newPassword?: string;
}

export interface PostTeamRes {
  id: number;
  login_id: string;
  role: string;
}

export interface PutTeamRes {
  id: number;
  login_id: string;
  role: string;
}

export interface DeleteTeamRes {
  id: number;
  login_id: string;
  role: string;
}
