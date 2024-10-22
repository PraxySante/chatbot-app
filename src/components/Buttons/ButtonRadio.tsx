import { IButtonRadio } from '../../types/inputs/inputs.interface';

export default function ButtonRadio({
  selectedLanguage,
  selectedItem,
  language,
  groupName,
}: IButtonRadio) {
  return (
    <>
      <input
        type="radio"
        name={groupName}
        id={language.name}
        defaultChecked={selectedLanguage === language.id ? true : false}
        onClick={() => selectedItem(language.id)}
      />
      {language.icon}
      <label htmlFor={groupName}>{language.name}</label>
    </>
  );
}
