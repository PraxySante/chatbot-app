import { Dispatch, SetStateAction, useEffect } from 'react';
import { useChat } from '../../hooks/ChatProvider';
import icons from '../../constants/icons';
import Link from '../../components/Link/Link';

interface ITabProceduresAttributes {
  SetSelectedProcedure: Dispatch<SetStateAction<number>>;
}

export default function TabProcedures({
  SetSelectedProcedure,
}: ITabProceduresAttributes) {
  const { procedures } = useChat();
  console.log('🚀 ~ TabProcedures ~ procedures:', procedures);

  useEffect(() => {
    renderingResultsProcedures();
  }, [procedures]);

  function renderingResultsProcedures() {
    return procedures.map((procedure: any, index: number) => {
      return (
        <li className="me-2">
          <Link
            className="tab-procedure"
            id={`tap-procedure-${index}`}
            name={''}
            onClick={() => SetSelectedProcedure(index)}
          >
            {procedure.content}
            {icons.chain}
          </Link>
        </li>
      );
    });
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {renderingResultsProcedures()}
      </ul>
    </div>
  );
}
