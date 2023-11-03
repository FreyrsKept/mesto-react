import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card)
    }

    return (
        <figure className="cards__element">
            <button className="cards__delete" type="button"></button>
            <img className="cards__image" src={props.link} alt={props.name} title="Развернуть фото" onClick={handleClick} />
            <div className="cards__info">
                <h2 className="cards__title">{props.name}</h2>
                <div className="cards__like-wrp">
                    <button type="button" className="cards__like-button" />
                    <p className="cards__like-counter">{props.likes}</p>
                </div>
            </div>
        </figure>
    )
}

export default Card;