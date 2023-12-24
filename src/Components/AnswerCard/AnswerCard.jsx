import React from "react";
import Styles from "./styles.module.css"

const SkillCard = (props) => {
return (
    <div style={{ backgroundColor: props.correct ? "green" : props.selected ? "lightBlue" : "#f0f8fc"}}className={ Styles.answerCard } onClick={ props.onClick }>
        <p>{ props.text }</p>
    </div>
)
}

export default SkillCard