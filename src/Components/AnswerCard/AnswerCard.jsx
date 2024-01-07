export default function SkillCard(props) {
  return (
    <div
      className={` border-greyanswer text-greytext m-2 flex h-36 w-52 items-center justify-center rounded-xl border-2 p-16`}
      onClick={props.onClick}>
      <p className="">{props.text}</p>
    </div>
  );
}
// ${
//   props.correct
//     ? 'bg-correct'
//     : props.selected
//       ? 'bg-selected'
//       : 'bg-greyanswer'
// }