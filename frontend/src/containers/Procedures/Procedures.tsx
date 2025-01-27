import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import Button from '../../components/Buttons/Button';
import Title from '../../components/Text/Title';
import Description from '../../components/Text/Description';
import ReaderDocument from '../ReaderDocument/ReaderDocument';
import TabPanel from '../TabPanel/TabPanel';

interface IProcedureAttributes {
  selectedPanel: string;
  setSelectedPanel: Dispatch<SetStateAction<string>>;
}

export default function Procedures({selectedPanel, setSelectedPanel}:IProcedureAttributes) {
  const { userLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <section>
      <div className="flex relative w-screen h-12 justify-center">

       <TabPanel
        selectedPanel={selectedPanel}
        setSelectedPanel={setSelectedPanel}
      />
      </div>
      <Title
        content={userLanguage ? userLanguage?.procedure_visualize : ''}
        tag={'h3'}
        className={''}
      />
      {isLoading && userLanguage ? (
        <section className="flex flex-col">
          <Title
            content={userLanguage?.procedure_not_yet}
            tag={'h4'}
            className={''}
          />
          <Title
            content={userLanguage?.procedure_responses_files}
            tag={'h4'}
            className={''}
          />
        </section>
      ) : (
        <section>
          {userLanguage && (
            <>
              <Button
                type={'button'}
                content={userLanguage?.procedure_download}
                onClick={() => console.log('click')}
              />
              <Description
                content={userLanguage?.procedure_title}
                tag={'p'}
                className={''}
              />
              <Description
                content={userLanguage?.procedure_none}
                tag={'p'}
                className={''}
              />
              <Description
                content={userLanguage?.procedure_file_displayed}
                tag={'p'}
                className={''}
              />
              <ReaderDocument />
            </>
          )}
        </section>
      )}
    </section>
  );
}
