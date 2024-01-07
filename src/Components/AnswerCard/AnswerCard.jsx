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
      className="bg-greyanswer border-greyanswerb flex content-center justify-center h-64 w-72 border-2 p-16 m-2"
      onClick={props.onClick}>
      <p>{props.text}</p>
    </div>
  );
}
