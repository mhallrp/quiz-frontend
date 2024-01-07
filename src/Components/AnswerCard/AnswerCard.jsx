export default function SkillCard(props) {
  const getBackgroundClass = () => {
    if (props.correct) {
      return 'bg-correct';
    } else if (props.selected) {
      return 'bg-selected';
    } else {
      return 'bg-greyanswer';
    }
  };

  const backgroundClass = getBackgroundClass();

  return (
    <div
      className={`${backgroundClass} border-greyanswer text-center text-greytext m-2 flex h-36 w-52 items-center justify-center rounded-xl border-2 p-16`}
      onClick={props.onClick}>
      <p>{props.text}</p>
    </div>
  );
}
