export default function SkillCard(props) {
  return (
    <div
      className={`${
        props.correct
          ? 'bg-correct'
          : props.selected
            ? 'bg-selected'
            : 'bg-greyanswer'
      } border-greyanswerb m-2 flex h-64 w-72 content-center justify-center rounded-xl border-2 p-16`}
      onClick={props.onClick}>
      <p>{props.text}</p>
    </div>
  );
}
