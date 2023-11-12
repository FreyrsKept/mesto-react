import React, { useEffect } from 'react';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "./CurrentUserContext";
import EditAvatarPopup from './EditAvatarPopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
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

  useEffect(() => {
    if (isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || selectedCard) {
      function handleEscape(evt) {
        if (evt.key === 'Escape') {
          closePopups();
        }
      }

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
      }
    }
  }, [isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, selectedCard]);

  function handleCardLike(card) {
    const isLiked = card.Likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api.setCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.log(err);
      });
    } else {
      api.deleteCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  function handleUpdateUser(data) {
    console.log(data);
    api.sendUserInfo(data).then((newUser) => {
      setCurrentUser(newUser);
      closePopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(data) {
    api.sendNewCardInfo(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closePopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card).then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id && c));
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleAvatarUpdate(data) {
    console.log(data);
    api.setUserAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closePopups();
    }).catch((err) => {
      console.log(err);
    })
  }

  function handleAvatarEdit() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleProfileEdit() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closePopups() {
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
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closePopups}
            onSubmit={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closePopups}
            onSubmit={handleAvatarUpdate}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closePopups}
            onSubmit={handleAddPlaceSubmit}
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
