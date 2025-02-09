interface PostReviewReq {
  reviewContents: string;
  userRatings: number;
}

interface PostReviewRes {
  id: number;
}

interface GetReviewReq {
  [key: string]: any;
  page: number;
  size: number;
}

type Review = {
  id: number;
  reviewContents: string;
  modelRatings: number;
};

interface GetReviewRes {
  reviews: Review[];
  pageinfo: number;
}

interface GetReviewByIdRes extends Review {}
