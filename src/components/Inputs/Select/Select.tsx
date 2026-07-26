import React from 'react';
import '../inputs.scss';

interface SelectProps {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    required?: boolean;
    placeholder?: string;
    type?: string;
    label: string;
    ariaLabel?: string;
    options: any[];
    invalid?: boolean;
    helperText?: string;
  }

const Select = ({label, name, onChange, value , required=false, options, placeholder= '-- --', invalid = false, helperText }: SelectProps) => {
  return (
    <div className='input-container'>
    <label htmlFor={name} className='label'>
        {label}
        {required && <span className='required'>*</span>}
    </label>
        <select
            name={name}
            id={name}
            className={`input ${invalid ? 'invalid' : ''}`}
            onChange={(e)=>onChange(e)}
            value={value}
            aria-invalid={invalid || undefined}
        >
            <option className='select-option' value="" disabled>
                {placeholder}
            </option>
                {label}
            {options.map((option, index) => (
                <option className='select-option' key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {helperText && (
            <span className={`helper-text ${invalid ? 'invalid' : ''}`}>{helperText}</span>
        )}
    </div>
  )
}

export default Select
