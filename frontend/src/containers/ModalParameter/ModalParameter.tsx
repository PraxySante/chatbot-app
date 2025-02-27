import { Fragment } from 'react';
import useTranscription from '../../hooks/TranscriptionProvider';
import ModalParameterHeader from './ModalParameterHeader';
import Button from '../../components/Buttons/Button';

export default function ModalParameter() {
  // Init component
  const { listMicrophones, stateOpenModal, selectedMicrophone, startTranscription, userMicrophone } = useTranscription();
  
  function selectMicrophone(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log("🚀 ~ selectMicrophone ~ event.target.value:", event.target.value)
    selectedMicrophone(event.target.value);
  }

  // Function Close Modal action
  function closeModal() {
    stateOpenModal();
  }
  
  async function onSubmit(): Promise<void> {
    if (!userMicrophone && listMicrophones.length > 0) {
      console.log("🚀 ~ onSubmit ~ listMicrophones[0].label:", listMicrophones[0].label)
      selectedMicrophone(listMicrophones[1].label);
    }
    closeModal();
    startTranscription()
  }

  function renderingSelectOptions() {
    return (
      <>
        <label
          htmlFor="microphones"
          className="block text-sm font-medium text-black"
        >
          Avant de débuter une conversation vocale avec notre bot, veuillez sélectionner votre microphone.
        </label>
        <select
          id="microphones"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={userMicrophone ? userMicrophone.label : ""}
          onChange={selectMicrophone}
        >
        <option value="" disabled>-- Sélectionner un microphone --</option>

          {listMicrophones.map((microphone: any, index: number) => {
            return (
              <Fragment key={index}>
                <option
                  key={microphone.id}
                  label={microphone.label}
                >{microphone.label}</option>
              </Fragment>
            );
          })}
        </select>
        <Button
            type={'button'}
            content={'Envoyer'}
            onClick={() => {
              onSubmit();
            }}
          />
      </>
    );
  }

  return (
    <div id="modal-parameter-background">
      <div className="modal-parameter">
        <ModalParameterHeader closeModal={closeModal}/>
        <form className="">
          {renderingSelectOptions()}
        </form>
      </div>
    </div>
  );
}
