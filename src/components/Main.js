import React, {useEffect} from "react";
import api from "../utils/Api";
import Card from "./Card";

return (
    <main class="main">
        <section class="profile">
            <button class="profile__avatar-edit" type="button" title="Обновить аватар" onClick={props.onEditAvatar}>
                <img class="profile__avatar" src={userInfo.avatar} alt={userInfo.name}/>
            </button>
            <div class="profile__info">
                <h1 class="profile__name">{userInfo.name}</h1>
                <button class="profile__name-edit"type="button" title="Редактировать профиль" onClick={props.onEditProfile}/>
                <p class="profile__description">{userInfo.about}</p>
            </div>
            <button class="profile__add"type="button" title="Добавить новую фотографию" onClick={props.onAddPlace}/>
        </section>
        <section class="cards">
            <ul class="cards__list">
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

export default Main