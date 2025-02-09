import Description from '../../components/Text/Description';
import { useLanguage } from '../../hooks/UseLanguage';
import Button from '../../components/Buttons/Button';
import { useChat } from '../../hooks/ChatProvider';
import { lazy, useEffect } from 'react';
import ReaderDocument from './ReaderDocument/ReaderDocument';
import Title from '../../components/Text/Title';
import Video from './Video/Video';

type DisplayProcedureType = {
  selectedProcedure: number;
};

const Image = lazy(() => import('../../components/Logo/Logo'));


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
                  content={'La source est la page internet suivante (cliquez pour être redirigé) :'}
                  tag={'p'}
                  className={'text-black'}
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
                    content={"La source est un document qui va vous aider dans vos démarches. Une prévisualisation est disponible."}
                    tag={'p'}
                    className={'text-black'}
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
                      content={"La source est une vidéo qui vous aidera à mieux comprendre :"}
                      tag={'p'}
                      className={'text-black'}
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
                  <Image imgSource={'./no-data.jpg'} classname={'max-w-sm'} />
                  <Description
                    content={userLanguage?.procedure_not_yet}
                    tag={'p'}
                    className={'text-black'}
                  />
                </>
              ) : null}
            </>
          );
      }
    } else {
      return (
        <>
          {userLanguage ? (
            <>
              <Image imgSource={'./no-data.jpg'} classname={'max-w-sm'} />
              <Description
                content={userLanguage?.procedure_not_yet}
                tag={'p'}
                className={'text-black'}
              />
            </>
          ) : null}
        </>
      );
    }
  }

  return (
    <div className='h-full w-full flex flex-col'>
      {userLanguage && (
        <section className="flex flex-col justify-start items-center p-4 gap-4 border border-black outlined text-medium text-white rounded-lg  ">
          <Title
            content={userLanguage?.procedure_title}
            tag={'h3'}
            className={'text-black'}
          />
          {renderingProcedure()}
        </section>
      )}
    </div>
  );
}
