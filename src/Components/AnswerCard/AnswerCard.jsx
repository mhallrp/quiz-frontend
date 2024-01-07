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
      className="bg-greyanswer rounded-xl border-greyanswerb flex content-center justify-center h-64 w-72 border-2 p-16 m-2"
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