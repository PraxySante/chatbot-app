import { useEffect, useState } from 'react';
import Input from '../../components/Inputs/Input';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { IInputEvaluate } from '../../types/inputs/inputs.interface';
import Title from '../../components/Text/Title';
import Description from '../../components/Text/Description';

export default function InputEvaluate({
  id,
  content,
  getDataForm,
}: IInputEvaluate) {
  // Init Component
  // Hook State to get score for each input
  const [score, setScore] = useState<number>(0);
  const [isShowInformation, setIsShowinformation] = useState<boolean>(false);
  const [contentTitle, setContentTitle] = useState<string>('');
  const [contentInformation, setContentInformation] = useState<string>('');

  useEffect(() => {
    const startPoint = content.indexOf('*') + 2;
    const endPoint = content.lastIndexOf('*') - 3;

    const contentTitle = content.slice(startPoint, endPoint);
    const contentInformation = content.slice(endPoint + 4, content.length);
    setContentTitle(contentTitle);
    setContentInformation(contentInformation);
  }, []);

  // Hook to render each score according user action
  useEffect(() => {
    renderingScore();
  }, [score]);

  // Function Socre InputEvaluate : Sum and subtraction
  function upAndDownScore(operator: string, score: number): void {
    switch (operator) {
      case '-':
        if (score >= 0) score--;
        break;
      case '+':
        if (score < 5) score++;
        break;
    }
    // Update score
    setScore(score);
    // Get data from user action and including into feedback
    getDataForm({ id: `${id.replace('feedback_', '')}`, value: score });
  }

  // Function render each score according user action
  function renderingScore() {
    return <Input score={score} variant={'number'} />;
  }

  function showInformation() {
    setIsShowinformation(!isShowInformation);
  }

  return (
    <>
      <div className="flex flex-row w-fit" onClick={showInformation}>
        <IconButton
          className="border border-solid border-slate-200 w-fit h-fit rounded-xl"
          icon={isShowInformation ? icons?.showText : icons?.reduceText}
        />
        <Title content={contentTitle} tag={'h2'} className={''} />
      </div>
      <Description
        id={id}
        content={contentInformation}
        tag={'p'}
        className={isShowInformation ? 'text-sm w-52' : 'hidden'}
      />

      <div className="container-input">
        {/* Render input component according new score  */}
        {renderingScore()}
        {/* Button decrease  */}
        <IconButton
          disabled={score > 0 ? false : true}
          className={score > 0 ? 'icons-input' : 'icons-disabled'}
          icon={icons?.minus}
          onClick={() => upAndDownScore('-', score)}
        />
        {/* Button increase  */}
        <IconButton
          className="icons-input semi-rounded"
          icon={icons?.add}
          onClick={() => upAndDownScore('+', score)}
        />
      </div>
    </>
  );
}
