function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container">
                <form name={props.form} className="popup__form">
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" title="Отправить" className="popup__submit">Сохранить</button>
                </form>
                <button type="button" className="popup__close" aria-label="Закрыть" onClose={props.onClose} />
            </div>
        </div>
    )
}

export default PopupWithForm;