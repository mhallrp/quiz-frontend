export default function SkillCard(props) {
  return (
    <div
      style={{
        backgroundColor: props.correct
          ? 'green'
          : props.selected
            ? '#effe16'
            : '#f5ff69',
      }}
      className="border-greyanswer text-greytext m-2 flex h-36 w-52 items-center justify-center rounded-xl border-2 p-16"
      onClick={props.onClick}>
      <p>{props.text}</p>
    </div>
  );
}

// className={`${
//   props.correct
//     ? 'bg-correct'
//     : props.selected
//       ? 'bg-selected'
//       : 'bg-greyanswer'
// } border-greyanswer text-greytext m-2 flex h-36 w-52 items-center justify-center rounded-xl border-2 p-16`}