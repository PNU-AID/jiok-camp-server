import { deleteTeam, postTeam, putTeam } from '@/hooks/apis/camp2/team';
import { Dispatch, SetStateAction, useState } from 'react';

export interface PopUpData {
  type: 'create' | 'password' | 'teamname' | 'delete';
  targetId?: number;
  targetName?: string;
}

export default function PopUp(props: {
  popUpData: PopUpData | null;
  setPopUpData: Dispatch<SetStateAction<PopUpData | null>>;
  setRefresh: Dispatch<SetStateAction<number>>;
}) {
  const initialCreateData = {
    teamname: '',
    password: '',
    passwordCheck: '',
  };
  const initialPasswordData = {
    password: '',
    passwordCheck: '',
  };
  const initialTeamnameData = {
    teamname: '',
  };
  const initialDeleteData = {
    teamname: '',
  };

  const [createData, setCreateData] = useState(initialCreateData);
  const [passwordData, setPasswordData] = useState(initialPasswordData);
  const [teamnameData, setTeamnameData] = useState(initialTeamnameData);
  const [deleteData, setDeleteData] = useState(initialDeleteData);

  const createSubmitHandler = async () => {
    if (!createData.teamname) return alert('팀 이름을 입력해주세요.');

    if (!createData.password) return alert('비밀번호를 입력해주세요.');

    if (createData.password !== createData.passwordCheck)
      return alert('비밀번호 확인을 정확히 입력해주세요.');

    const res = await postTeam({
      login_id: createData.teamname,
      password: createData.password,
    });

    if (res) {
      setCreateData(initialCreateData);
      props.setRefresh((prev) => prev + 1);
      props.setPopUpData(null);
    }
  };

  const passwordSubmitHandler = async () => {
    if (!passwordData.password) return alert('비밀번호를 입력해주세요.');

    if (passwordData.password !== passwordData.passwordCheck)
      return alert('비밀번호 확인을 정확히 입력해주세요.');

    if (!props.popUpData?.targetId) return console.log('PopUp Error');

    const res = await putTeam({
      id: props.popUpData?.targetId,
      newPassword: passwordData.password,
    });

    if (res) {
      setPasswordData(initialPasswordData);
      alert(`${props.popUpData.targetName}의 비밀번호가 변경되었습니다.`);
      props.setPopUpData(null);
    }
  };

  const teamnameSubmitHandler = async () => {
    if (!teamnameData.teamname) return alert('변경할 팀 이름을 입력해주세요.');

    if (!props.popUpData?.targetId) return console.log('PopUp Error');

    const res = await putTeam({
      id: props.popUpData?.targetId,
      login_id: teamnameData.teamname,
    });

    if (res) {
      alert(
        `${props.popUpData.targetName}이 ${teamnameData.teamname}으로 변경되었습니다.`,
      );
      setTeamnameData(initialTeamnameData);
      props.setRefresh((prev) => prev + 1);
      props.setPopUpData(null);
    }
  };

  const deleteSubmitHandler = async () => {
    if (!deleteData.teamname)
      return alert('삭제할 팀 이름을 똑같이 입력해주세요.');

    if (!props.popUpData?.targetId) return console.log('PopUp Error');

    const res = await deleteTeam({
      id: props.popUpData.targetId,
    });

    if (res) {
      alert(`${props.popUpData.targetName}이 삭제되었습니다.`);
      setDeleteData(initialDeleteData);
      props.setRefresh((prev) => prev + 1);
      props.setPopUpData(null);
    }
  };

  if (props.popUpData)
    switch (props.popUpData.type) {
      case 'create':
        return (
          <div
            className="absolute left-1/2 top-1/2 flex flex-col gap-4 bg-white p-12 drop-shadow-2xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div className="flex flex-col gap-2">
              <h3>팀 이름</h3>
              <input
                className="border-2 px-4 py-2"
                type="text"
                onChange={(e) =>
                  setCreateData({ ...createData, teamname: e.target.value })
                }
                value={createData.teamname}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3>비밀번호</h3>
              <input
                className="border-2 px-4 py-2"
                type="password"
                onChange={(e) =>
                  setCreateData({ ...createData, password: e.target.value })
                }
                value={createData.password}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3>비밀번호 확인</h3>
              <input
                className="border-2 px-4 py-2"
                type="password"
                onChange={(e) =>
                  setCreateData({
                    ...createData,
                    passwordCheck: e.target.value,
                  })
                }
                value={createData.passwordCheck}
              />
            </div>
            <div className="flex justify-evenly font-semibold">
              <button
                className="w-24 bg-gray-400 py-2 text-white"
                onClick={() => {
                  setCreateData(initialCreateData);
                  props.setPopUpData(null);
                }}
              >
                취소
              </button>
              <button
                className="w-24 bg-aid-blue py-2 text-white"
                onClick={createSubmitHandler}
              >
                생성
              </button>
            </div>
          </div>
        );
      case 'password':
        return (
          <div
            className="absolute left-1/2 top-1/2 flex flex-col gap-4 bg-white p-12 drop-shadow-2xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div className="flex flex-col gap-2">
              <h3>팀 이름</h3>
              <p>{props.popUpData.targetName}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3>변경할 비밀번호</h3>
              <input
                className="border-2 px-4 py-2"
                type="password"
                onChange={(e) =>
                  setPasswordData({ ...passwordData, password: e.target.value })
                }
                value={passwordData.password}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3>비밀번호 확인</h3>
              <input
                className="border-2 px-4 py-2"
                type="password"
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    passwordCheck: e.target.value,
                  })
                }
                value={passwordData.passwordCheck}
              />
            </div>
            <div className="flex justify-evenly font-semibold">
              <button
                className="w-24 bg-gray-400 py-2 text-white"
                onClick={() => {
                  setPasswordData(initialPasswordData);
                  props.setPopUpData(null);
                }}
              >
                취소
              </button>
              <button
                className="w-24 bg-aid-blue py-2 text-white"
                onClick={passwordSubmitHandler}
              >
                변경
              </button>
            </div>
          </div>
        );
      case 'teamname':
        return (
          <div
            className="absolute left-1/2 top-1/2 flex flex-col gap-4 bg-white p-12 drop-shadow-2xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div className="flex flex-col gap-2">
              <h3>팀 이름</h3>
              <p>{props.popUpData.targetName}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3>변경할 팀이름</h3>
              <input
                className="border-2 px-4 py-2"
                type="text"
                onChange={(e) =>
                  setTeamnameData({ ...teamnameData, teamname: e.target.value })
                }
                value={teamnameData.teamname}
              />
            </div>
            <div className="flex justify-evenly font-semibold">
              <button
                className="w-24 bg-gray-400 py-2 text-white"
                onClick={() => {
                  setTeamnameData(initialTeamnameData);
                  props.setPopUpData(null);
                }}
              >
                취소
              </button>
              <button
                className="w-24 bg-aid-blue py-2 text-white"
                onClick={teamnameSubmitHandler}
              >
                변경
              </button>
            </div>
          </div>
        );
      case 'delete':
        return (
          <div
            className="absolute left-1/2 top-1/2 flex flex-col gap-4 bg-white p-12 drop-shadow-2xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div className="flex flex-col gap-2">
              <h3>팀 이름</h3>
              <p>{props.popUpData.targetName}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3>삭제할 팀이름을 똑같이 입력</h3>
              <input
                className="border-2 px-4 py-2"
                type="text"
                onChange={(e) =>
                  setDeleteData({ ...deleteData, teamname: e.target.value })
                }
                value={deleteData.teamname}
              />
            </div>
            <div className="flex justify-evenly font-semibold">
              <button
                className="w-24 bg-gray-400 py-2 text-white"
                onClick={() => {
                  setDeleteData(initialDeleteData);
                  props.setPopUpData(null);
                }}
              >
                취소
              </button>
              <button
                className="w-24 bg-aid-blue py-2 text-white"
                onClick={deleteSubmitHandler}
              >
                삭제
              </button>
            </div>
          </div>
        );
    }

  return undefined;
}
