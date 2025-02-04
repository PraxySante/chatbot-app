import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import Title from '../../components/Text/Title';

import TabPanel from '../TabPanel/TabPanel';
import TabProcedures from './TabProcedures';
import DisplayProcedures from './DisplayProcedure';

interface IProcedureAttributes {
  selectedPanel: 'chat' | 'procedure';
  setSelectedPanel: Dispatch<SetStateAction<'chat' | 'procedure'>>;
}

export default function Procedures({
  selectedPanel,
  setSelectedPanel,
}: IProcedureAttributes) {
  const { userLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProcedure, SetSelectedProcedure] = useState<number>(0);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <section id="procedure">
      <div className="flex relative w-screen h-12 justify-center">
        <TabPanel
          selectedPanel={selectedPanel}
          setSelectedPanel={setSelectedPanel}
        />
      </div>

      {isLoading && userLanguage ? (
        <section className="flex flex-col">
          <Title
            content={userLanguage?.procedure_not_yet}
            tag={'h1'}
            className={''}
          />
          <Title
            content={userLanguage?.procedure_responses_files}
            tag={'h3'}
            className={''}
          />
        </section>
      ) : (
        <section className="md:flex mt-2 h-screen">
          <>
            <TabProcedures selectedProcedure={selectedProcedure} SetSelectedProcedure={SetSelectedProcedure} />
            <DisplayProcedures selectedProcedure={selectedProcedure} />
          </>
        </section>
      )}
    </section>
  );
}
