import Description from '../../components/Text/Description';
import { useLanguage } from '../../hooks/UseLanguage';
import Button from '../../components/Buttons/Button';
import { useChat } from '../../hooks/ChatProvider';
import { useEffect } from 'react';
import ReaderDocument from './ReaderDocument/ReaderDocument';

type DisplayProcedureType = {
  selectedProcedure: number;
};

export default function DisplayProcedures({
  selectedProcedure,
}: DisplayProcedureType) {
  const { userLanguage } = useLanguage();
  const { procedures } = useChat();

  useEffect(() => {
    renderingProcedure();
  }, [selectedProcedure]);

  function renderingProcedure() {
    if (procedures.length > 0) {
      switch (procedures[selectedProcedure].doc_type) {
        case 'url':
          return (
            <>
              <Button
                type={'button'}
                content={procedures[selectedProcedure].content}
                onClick={() =>
                  window.open(procedures[selectedProcedure].doc_ref, '_blank')
                }
              />
            </>
          );
        case 'doc':
          return (
            <>
              <ReaderDocument
                fileDocument={procedures[selectedProcedure].content}
              />
            </>
          );
        default:
          return (
            <>
              {userLanguage ? (
                <>
                  <Button
                    type={'button'}
                    content={userLanguage?.procedure_download}
                    onClick={() => console.log('click')}
                  />
                  <Description
                    content={userLanguage?.procedure_not_yet}
                    tag={'p'}
                    className={''}
                  />
                </>
              ) : null}
            </>
          );
      }
    } else {
      console.error('Erreur affichage');
      return (
        <>
          {userLanguage ? (
            <Description
              content={userLanguage?.procedure_not_yet}
              tag={'p'}
              className={''}
            />
          ) : null}
        </>
      );
    }
  }

  return (
    <>
      {userLanguage && (
        <section className="p-6 bg-primary text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
          <Description
            content={userLanguage?.procedure_title}
            tag={'p'}
            className={''}
          />

          <Description
            content={userLanguage?.procedure_file_displayed}
            tag={'p'}
            className={''}
          />
          {renderingProcedure()}
        </section>
      )}
    </>
  );
}
