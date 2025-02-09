import {
  GetCsvReq,
  GetCsvRes,
  PatchCsvReq,
  PatchCsvRes,
  PostCsvRes,
} from '@/types/api/csv';

export async function postCsv(formData: FormData) {
  const res = await fetch(`/api/csv`, {
    method: 'POST',
    body: formData,
  });

  if (res.ok) {
    const data: PostCsvRes = await res.json();
    return data;
  } else if (res.status < 500) {
    const err = await res.json();
    alert(err.error);
    return undefined;
  } else {
    const err = await res.json();
    alert(err.error);
    return undefined;
  }
}

export async function patchCsv(body: PatchCsvReq) {
  const res = await fetch(`/api/csv`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });

  if (res.ok) {
    const data: PatchCsvRes = await res.json();
    return data;
  } else if (res.status < 500) {
    const err = await res.json();
    alert(err.error);
    return undefined;
  } else {
    const err = await res.json();
    alert(err.error);
    return undefined;
  }
}

export async function getCsv(params: GetCsvReq) {
  const paramsString = new URLSearchParams(params);
  const res = await fetch(`/api/csv?${paramsString}`);

  if (res.ok) {
    const data: GetCsvRes = await res.json();
    data.sort((a, b) => b.id - a.id);
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
