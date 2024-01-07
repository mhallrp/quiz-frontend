export default function SkillCard(props) {
  return (
    <div
      className={`${
        props.correct
          ? 'bg-correct'
          : props.selected
            ? 'bg-selected'
            : 'bg-greyanswer'
      }`}
      onClick={props.onClick}>
      <p className="">{props.text}</p>
    </div>
  );
}
