import "./../inputs.scss";

interface InputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  required?: boolean;
  placeholder?: string;
  type?: string;
  label: string;
  disabled?: boolean;
  ariaLabel?: string;
  min?: string;
}

const Input = ({
    name,
    onChange,
    value,
    required = false,
    label,
    type = "text",
    placeholder,
    disabled = false,
    ariaLabel,
    min
}: InputProps) => {

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="input-container">
        <label htmlFor={name} className="label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        min={type ==='datetime-local' ? min: undefined}
        name={name}
        value={value}
        onChange={(e) => handleChangeValue(e)}
        required={required}
        className="input"
        disabled={disabled}
        aria-label={ariaLabel ? ariaLabel : undefined}
      />
    </div>
  );
};

export default Input;
