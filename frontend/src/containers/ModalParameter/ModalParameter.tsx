import { Fragment } from 'react';
import useTranscription from '../../hooks/TranscriptionProvider';
import ModalParameterHeader from './ModalParameterHeader';
import Button from '../../components/Buttons/Button';
import { useChat } from '../../hooks/ChatProvider';
import './ModalParameter.css';

export default function ModalParameter() {
  // Init component
  const {
    listMicrophones,
    stateOpenModal,
    selectedMicrophone,
    startTranscription,
    userMicrophone,
  } = useTranscription();
  const { uuidSession } = useChat();

  const INIT_MICROPHONE =
    'Avant de débuter une conversation vocale avec notre bot, veuillez sélectionner votre microphone.';

  function selectMicrophone(event: React.ChangeEvent<HTMLSelectElement>) {
    selectedMicrophone(event.target.value);
  }

  // Function Close Modal action
  function closeModal() {
    stateOpenModal();
  }

  async function onSubmit(): Promise<void> {
    if (!userMicrophone && listMicrophones.length > 0) {
      selectedMicrophone(listMicrophones[1].label);
    }
    closeModal();
    const hostname = document.location.hostname;
    await startTranscription(hostname, uuidSession);
  }

  function renderingSelectOptions() {
    return (
      <>
        <label htmlFor="microphones" className="modal-parameter_label">
          {INIT_MICROPHONE}
        </label>
        <select
          id="microphones"
          className="modal-parameter_select-micro"
          value={userMicrophone ? userMicrophone.label : ''}
          onChange={selectMicrophone}
        >
          <option value="" disabled>
            -- Sélectionner un microphone --
          </option>

          {listMicrophones.map((microphone: any, index: number) => {
            return (
              <Fragment key={index}>
                <option key={microphone.id} label={microphone.label}>
                  {microphone.label}
                </option>
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
        <ModalParameterHeader closeModal={closeModal} />
        <form className="">{renderingSelectOptions()}</form>
      </div>
    </div>
  );
}
