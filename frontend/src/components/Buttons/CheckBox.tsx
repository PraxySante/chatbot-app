import { ICheckBox } from '../../types/inputs/inputs.interface';

export default function CheckBox({
  className,
  selectedItem,
  groupName,
  content,
}: ICheckBox) {
  return (
    <div className={className}>
      <input
        title={groupName}
        type="checkbox"
        name={groupName}
        onClick={selectedItem}
      />
      <label htmlFor={groupName}>{content}</label>
    </div>
  );
}
