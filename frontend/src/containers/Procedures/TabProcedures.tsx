import { Fragment, useEffect } from 'react';
import { useChat } from '../../hooks/ChatProvider';
import Link from '../../components/Link/Link';
import { ITabProceduresAttributes } from '../../types/procedures/procedures.interface';
import icons from '../../constants/icons';
import { useClient } from '../../hooks/ClientProvider';
import './Procedure.css';

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
      if (
        procedure?.doc_type === 'doc' &&
        !configClient?.options?.displayDocument
      )
        return null;
      {
        return (
          <Fragment key={index}>
            <li className="me-2 w-full">
              <Link
                className={
                  selectedProcedure === index
                    ? 'tab-procedure_selected'
                    : 'tab-procedure outlined'
                }
                id={`tab-procedure-${index}`}
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
    <div className="border-b border-gray-200 overflow-y-auto mb-48">
      <ul className="flex flex-col space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
        {renderingResultsProcedures()}
      </ul>
    </div>
  );
}
