import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import './App.css';

function App() {
function handleAvatarEdit(){
}
function handleProfileEdit(){
}
function handleAddPlace(){
}
function handleCardClick(){
}
function closePopups(){
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
        {/* <PopupWithForm
        />
        <PopupWithForm
        />
        <ImagePopup
        /> */}
      </div>
    </div>
  )
}

export default App;
