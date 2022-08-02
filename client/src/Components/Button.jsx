export const Button = ({ buttonText, classes, action }) => {
  return (
    <button className={classes} onClick={action}>
      {buttonText}
    </button>
  );
};
