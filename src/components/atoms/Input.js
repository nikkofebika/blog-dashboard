const Input = ({ label, ...etc }) => {
  return (
    <>
      <label>{label}</label>
      <input {...etc} className="form-control" />
    </>
  );
};

export default Input;
