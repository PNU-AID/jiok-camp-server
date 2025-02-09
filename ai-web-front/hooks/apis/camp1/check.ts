import { camp1BackendUrl } from '@/constants';

export async function getCheckById(id: number) {
  const res = await fetch(`${camp1BackendUrl}/api/check/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    if (res.status === 200) {
      const data: GetCheckByIdRes = await res.json();
      return data;
    } else {
      const data: { message: string } = await res.json();
      alert(data.message);
    }
  } else {
    console.error(`/api/check/${id}`, res.status, '리뷰 예측 상태 확인인 실패');
  }
}
