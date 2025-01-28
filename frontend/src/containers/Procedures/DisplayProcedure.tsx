import Description from '../../components/Text/Description';
import { useLanguage } from '../../hooks/UseLanguage';
import Button from '../../components/Buttons/Button';
import { useChat } from '../../hooks/ChatProvider';
import { useEffect } from 'react';
import ReaderDocument from './ReaderDocument/ReaderDocument';
import Image from '../../components/Logo/Logo';
import Title from '../../components/Text/Title';
import Video from './Video/Video';

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
              {userLanguage && (
                <Description
                  content={userLanguage?.procedure_file_displayed}
                  tag={'p'}
                  className={''}
                />
              )}
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
              {userLanguage && (
                <>
                  <Description
                    content={userLanguage?.procedure_file_displayed}
                    tag={'p'}
                    className={''}
                  />
                  <Button
                    type={'button'}
                    content={userLanguage?.procedure_download}
                    onClick={() => console.log('click')}
                  />
                  <ReaderDocument
                    fileDocument={procedures[selectedProcedure].content}
                  />
                </>
              )}
            </>
          );
          case 'video':
            return (
              <>
                {userLanguage && (
                  <>
                    <Description
                      content={userLanguage?.procedure_file_displayed}
                      tag={'p'}
                      className={''}
                    />

                    <Video
                      fileDocument={procedures[selectedProcedure].content}
                    />
                  </>
                )}
              </>
            );
        default:
          return (
            <>
              {userLanguage ? (
                <>
                  <Image imgSource={'./no-data.jpg'} classname={''} />
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
            <>
              <Image imgSource={'./no-data.jpg'} classname={'w-1/2 h-1/2'} />
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
  }

  return (
    <>
      {userLanguage && (
        <section className="flex flex-col justify-center items-center p-4 gap-4 border border-black outlined text-medium text-white rounded-lg h-full w-full overflow-y-scroll overflow-x-hidden ">
          <Title
            content={userLanguage?.procedure_title}
            tag={'h3'}
            className={''}
          />
          {renderingProcedure()}
        </section>
      )}
    </>
  );
}
