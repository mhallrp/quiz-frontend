export default function SkillCard(props) {
  return (
    <div
      className={`${
        props.correct
          ? 'bg-correct'
          : props.selected
            ? 'bg-selected'
            : 'bg-greyanswer'
      } h-36 w-52 items-center justify-center rounded-xl border-2 p-16`}
      onClick={props.onClick}>
      <p className="">{props.text}</p>
    </div>
  );
}
