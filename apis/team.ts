import {
  DeleteTeamReq,
  DeleteTeamRes,
  GetTeamRes,
  PostTeamReq,
  PostTeamRes,
  PutTeamReq,
  PutTeamRes,
} from '@/types/api/team';

export async function postTeam(body: PostTeamReq) {
  const res = await fetch(`/api/team`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (res.ok) {
    const data: PostTeamRes = await res.json();
    return data;
  } else {
    const err = await res.json();
    alert(err.error);
    return undefined;
  }
}

export async function putTeam(body: PutTeamReq) {
  const res = await fetch(`/api/team`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  if (res.ok) {
    const data: PutTeamRes = await res.json();
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

export async function getTeam() {
  const res = await fetch(`/api/team`);

  if (res.ok) {
    const data: GetTeamRes = await res.json();
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

export async function deleteTeam(params: DeleteTeamReq) {
  const paramsString = new URLSearchParams(params);
  const res = await fetch(`/api/team?${paramsString}`, { method: 'DELETE' });

  if (res.ok) {
    const data: DeleteTeamRes = await res.json();
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
