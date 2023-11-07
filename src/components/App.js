import React, {useEffect} from 'react';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import EditUserPopup from './EditUserPopup';
import ImagePopup from "./ImagePopup";
import './App.css';
import { CurrentUserContext } from "./CurrentUserContext";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(null)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(null)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(null)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);


  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([user, cards]) => {
    setCurrentUser(user);
    setCards(cards);
  }).catch((err) => {
  console.log(err);
  })
  }, []);

  function handleUpdateUser(data) {
    api.updateUserInfo(data).then((newUser) => {
      setCurrentUser(newUser);
      closePopups();
    }).catch((err) => {
      console.log(err);
    });
  }

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
    <CurrentUserContext.Provider value={currentUser}>
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

        <EditUserPopup
          isOpen={isEditProfilePopupOpen}
          onClose={closePopups}
          onSubmit={handleUpdateUser}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
