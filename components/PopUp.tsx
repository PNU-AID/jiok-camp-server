import { Dispatch, SetStateAction } from 'react';

interface PopUpQuestion {
  question: string;
  inputType: string;
}

export interface PopUpData {
  quesionList: PopUpQuestion[];
  onSubmitHandler: () => boolean;
  submitText: string;
}

export default function PopUp(props: {
  popUpData: PopUpData | null;
  setPopUpData: Dispatch<SetStateAction<PopUpData | null>>;
}) {
  if (props.popUpData)
    return (
      <div
        className="absolute left-1/2 top-1/2 flex flex-col gap-4 bg-white p-12 drop-shadow-2xl"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {props.popUpData.quesionList.map((question, index) => {
          return (
            <div
              key={`question-component-${index}`}
              className="flex flex-col gap-2"
            >
              <h3>{question.question}</h3>
              <input className="border-2 px-4 py-2" type={question.inputType} />
            </div>
          );
        })}
        <div className="flex justify-evenly font-semibold">
          <button
            className="w-24 bg-gray-400 py-2 text-white"
            onClick={() => props.setPopUpData(null)}
          >
            취소
          </button>
          <button
            className="w-24 bg-aid-blue py-2 text-white"
            onClick={() => {
              if (props.popUpData?.onSubmitHandler())
                return props.setPopUpData(null);
            }}
          >
            {props.popUpData.submitText}
          </button>
        </div>
      </div>
    );

  return undefined;
}
