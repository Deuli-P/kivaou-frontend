import './Button.scss';

interface ButtonProps {
    version: string;
    onClick?: any;
    type?: 'button' | 'submit' | 'reset' | undefined;
    label: string;
    disabled?: boolean;
    ariaLabel?: string | undefined;
    }
const Button = ({version='primary', type='button', onClick, disabled=false, ariaLabel, label='Button'}: ButtonProps) => {
  return (
    <button
        type={type}
        onClick={onClick}
        className={`btn ${version} ${disabled ? 'disabled' : ''}`}
        disabled={disabled}
        aria-label={ariaLabel? ariaLabel : undefined}
    >
        {label}
    </button>
  )
}

export default Button