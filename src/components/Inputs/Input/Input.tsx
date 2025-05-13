import "./../inputs.scss";

interface InputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
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
    <label htmlFor={name} className="label">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleChangeValue(e)}
        required={required}
        className="input"
        disabled={disabled}
        aria-label={ariaLabel ? ariaLabel : undefined}
      />
    </label>
  );
};

export default Input;
