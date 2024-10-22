import { useEffect, useState } from 'react';
import Input from '../../components/Inputs/Input';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { IInputEvaluate } from '../../types/inputs/inputs.interface';

export default function InputEvaluate({
  id,
  content,
  getDataForm,
}: IInputEvaluate) {
  // Init Component
  // Hook State to get score for each input
  const [score, setScore] = useState<number>(0);

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

  return (
    <>
      <p id={id}>{content}</p>
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
