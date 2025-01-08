export interface CsvData {
  id: number;
  filename: string;
  user_id: number;
  selected: boolean;
  public_score: number;
  private_score?: number;
}

export interface PostCsvRes extends CsvData {}

export interface PatchCsvRes extends CsvData {}

export type GetCsvRes = CsvData[];

export interface PatchCsvReq {
  id: number;
}

export interface GetCsvReq {
  [key: string]: any;
  userId: number;
}
