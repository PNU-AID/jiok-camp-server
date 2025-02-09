import { GetRankRes } from '@/types/api/rank';

export async function getRank() {
  const res = await fetch(`/api/rank`);

  if (res.ok) {
    const data: GetRankRes = await res.json();
    return data;
  } else if (res.status < 500) {
    const err = await res.json();
    alert(err.message);
    return undefined;
  } else {
    const err = await res.json();
    alert(err.error);
    return undefined;
  }
}
