import Description from '../../components/Text/Description';
import { useLanguage } from '../../hooks/UseLanguage';
import Button from '../../components/Buttons/Button';
import { useChat } from '../../hooks/ChatProvider';
import { lazy, useEffect } from 'react';
import ReaderDocument from './ReaderDocument/ReaderDocument';
import Title from '../../components/Text/Title';
import Video from './Video/Video';
import { DisplayProcedureType } from '../../types/panel/panel.type';
import {
  DOC_TYPE_DOC,
  DOC_TYPE_URL,
  DOC_TYPE_VIDEO,
} from '../../constants/chat.constants';
import { getDocumentFromApi } from '../../services/ChatBot/getDocumentFromApi.service';
import { useClient } from '../../hooks/ClientProvider';

const Image = lazy(() => import('../../components/Logo/Logo'));

export default function DisplayProcedures({
  selectedProcedure,
}: DisplayProcedureType) {
  const { userLanguage, selectedLanguage } = useLanguage();
  const { procedures } = useChat();
  const { configClient } = useClient();

  const documents = procedures;

  useEffect(() => {
    renderingProcedure();
  }, [selectedProcedure]);

  function renderingProcedure() {
    if (documents.length > 0) {
      switch (documents[selectedProcedure].doc_type) {
        case DOC_TYPE_URL:
          return (
            <>
              {userLanguage && (
                <Description
                  content={userLanguage?.chat_description_page}
                  tag={'p'}
                  className={'text-black'}
                />
              )}
              <Button
                type={'button'}
                content={documents[selectedProcedure].content}
                onClick={() =>
                  window.open(documents[selectedProcedure].doc_ref, '_blank')
                }
              />
            </>
          );
        case DOC_TYPE_DOC:
          if (!configClient?.displayDocument) return null;
          return (
            <>
              {userLanguage && (
                <>
                  <Description
                    content={userLanguage?.chat_description_document}
                    tag={'p'}
                    className={'text-black'}
                  />
                  <Button
                    type={'button'}
                    content={userLanguage?.procedure_download}
                    onClick={downloadFile}
                  />
                  <ReaderDocument
                    fileDocument={documents[selectedProcedure].url}
                  />
                </>
              )}
            </>
          );
        case DOC_TYPE_VIDEO:
          return (
            <>
              {userLanguage && (
                <>
                  <Description
                    content={userLanguage?.chat_description_video}
                    tag={'p'}
                    className={'text-black'}
                  />

                  <Video fileDocument={documents[selectedProcedure].content} />
                </>
              )}
            </>
          );
        default:
          return (
            <>
              {userLanguage ? (
                <>
                  <Image
                    imgSource={'/images/no-data.jpg'}
                    classname={'max-w-sm'}
                  />
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
              <Image imgSource={'/images/no-data.jpg'} classname={'max-w-sm'} />
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

  async function downloadFile() {
    const urlDocument = await getDocumentFromApi(
      documents[selectedProcedure].url,
      selectedLanguage
    );
    const blob = new Blob([urlDocument.details], {
      type: 'application/pdf',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="h-full w-full flex flex-col">
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
