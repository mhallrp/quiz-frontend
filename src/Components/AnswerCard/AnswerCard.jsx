import Styles from "./styles.module.css"

export default function SkillCard (props) {
    return (
        <div style={{ backgroundColor: props.correct ? "lightGreen" : props.selected ? "#effe16" : "#f5ff69"}}className={ Styles.answerCard } onClick={ props.onClick }>
            <p>{ props.text }</p>
        </div>
    )
}