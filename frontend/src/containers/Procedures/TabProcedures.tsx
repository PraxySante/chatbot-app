import { Fragment, useEffect } from 'react';
import { useChat } from '../../hooks/ChatProvider';
import Link from '../../components/Link/Link';
import { ITabProceduresAttributes } from '../../types/procedures/procedures.interface';
import icons from '../../constants/icons';
import { useClient } from '../../hooks/ClientProvider';

export default function TabProcedures({
  selectedProcedure,
  SetSelectedProcedure,
}: ITabProceduresAttributes) {
  const { procedures } = useChat();
  const { configClient } = useClient();
  const displayedProcedure = procedures;

  useEffect(() => {
    renderingResultsProcedures();
  }, [procedures]);

  function renderingResultsProcedures() {
    return displayedProcedure.map((procedure: any, index: number) => {
      if (procedure?.doc_type === 'doc' && !configClient?.displayDocument)
        return null;
      {
        return (
          <Fragment key={index}>
            <li className="me-2 w-full">
              <Link
                className={
                  selectedProcedure === index
                    ? 'tab-procedure_selected'
                    : 'tab-procedure'
                }
                id={`tap-procedure-${index}`}
                name={''}
                onClick={() => SetSelectedProcedure(index)}
              >
                {procedure.content}
                {procedure.doc_type === 'url' ? icons.chain : icons.file}
              </Link>
            </li>
          </Fragment>
        );
      }
    });
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 overflow-y-auto  overflow-x-hidden">
      <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        {renderingResultsProcedures()}
      </ul>
    </div>
  );
}
