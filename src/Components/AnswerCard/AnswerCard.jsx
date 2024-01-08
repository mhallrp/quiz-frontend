const SkillCard = (props) => {

  const getBackgroundClass = () => {
    if (props.correct) {
      return 'bg-correct border-darkGreen text-black';
    } else if (props.selected) {
      return 'bg-selected border-darkYellow text-black';
    } else {
      return 'bg-greyanswer border-greyanswerb text-greytext';
    }
  };

  const backgroundClass = getBackgroundClass();

  return (
    <button
      className={`${backgroundClass} text-center flex h-36 w-52 items-center justify-center rounded-xl border-2 p-16`}
      onClick={props.onClick}>
      <p>{props.text}</p>
    </button>
  );
}

export default SkillCard
