export interface RankData {
  id: number;
  login_id: string; // FIXME API 수정 예정
  selected: boolean;
  public_score: number;
  private_score?: number;
}

export type GetRankRes = RankData[];
