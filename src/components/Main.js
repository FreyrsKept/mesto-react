import React, { useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {

    const [userInfo, setUserInfo] = React.useState({})
    const [cards, setCards] = React.useState([])
    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([profileInfo, card]) => {
            setUserInfo(profileInfo)
            setCards(card)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar-edit" type="button" title="Обновить аватар" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={userInfo.avatar} alt={userInfo.name} />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{userInfo.name}</h1>
                    <button className="profile__name-edit" type="button" title="Редактировать профиль" onClick={props.onEditProfile} />
                    <p className="profile__description">{userInfo.about}</p>
                </div>
                <button className="profile__add" type="button" title="Добавить новую фотографию" onClick={props.onAddPlace} />
            </section>
            <section className="cards">
                <ul className="cards__list">
                    {cards.map((card, id) => (
                        <Card
                            key={id}
                            card={card}
                            link={card.link}
                            name={card.name}
                            likes={card.likes.length}
                            onCardClick={props.onCardClick}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main