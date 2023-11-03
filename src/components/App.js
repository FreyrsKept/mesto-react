import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import './App.css';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(null)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(null)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(null)
  const [selectedCard, setSelectedCard] = React.useState(null)

function handleAvatarEdit(){
  setIsEditAvatarPopupOpen(true);
}

function handleProfileEdit(){
  setIsEditProfilePopupOpen(true);
}

function handleAddPlace(){
  setIsAddPlacePopupOpen(true);
}

function handleCardClick(card){
  setSelectedCard(card);
}

function closePopups(){
  setIsEditAvatarPopupOpen(false);
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setSelectedCard(null);
}

  return (
    <div className='page'>
      <div className='page__content'>
        <Header />
        <Main
          onEditAvatar={handleAvatarEdit}
          onEditProfile={handleProfileEdit}
          onAddPlace={handleAddPlace}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm 
        isOpen={isEditProfilePopupOpen}
        onClose={closePopups}
        name={'edit'}
        form={'profileSettings'}
        title={'Редактировать профиль'}
        buttonText={'Сохранить'}
        children={(
          <>
          <input name="name" id="username-input" type="text" placeholder="Ваше имя" className="popup__input" minLength="2" maxLength="40" required/>
          <span className="username-input-error popup__input-error"></span>
          <input name="about" id="description-input" type="text" placeholder="Ваша профессия" className="popup__input" minLength="2" maxLength="200" required/>
          <span className="description-input-error popup__input-error"></span>
          </>
        )}
        />

        <PopupWithForm 
        isOpen={isAddPlacePopupOpen}
        onClose={closePopups}
        name={'add'}
        form={'placeAdd'}
        title={'Новое место'}
        buttonText={'Создать'}
        children={(
          <>
          <input name="name" id="place-name-input" type="text" placeholder="Название изображения" className="popup__input popup__input_image-name" minLength="2" maxLength="30" required/>
          <span className="place-name-input-error popup__input-error"/>
          <input name="link" id="place-image-input" type="url" placeholder="Ссылка на изображение" className="popup__input popup__input_image-link" required/>
          <span className="place-image-input-error popup__input-error"/>
          </>
        )}
        />

        <PopupWithForm 
        isOpen={isEditAvatarPopupOpen}
        onClose={closePopups}
        name={'avatar'}
        form={'avatarAdd'}
        title={'Обновить аватар'}
        buttonText={'Сохранить'}
        children={(
          <>
          <input type="url" name="avatar" form="avatar-edit" required placeholder="Ссылка на картинку" className="popup__input popup__input_avatar-link" id="avatar-link-input"/>
          <span className="avatar-link-input-error popup__input-error"/>
          </>
        )}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closePopups}
        />
      </div>
    </div>
  );
}

export default App;
