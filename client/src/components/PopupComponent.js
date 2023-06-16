const PopupComponent = (props) => {
  return (
    <div className={`alert-${props.alertType}`}>
      <div className="container" onClick={props.callback}>
        <span className="close-icon" onClick={props.handleClose} aria-label="close pop-up">x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default PopupComponent;