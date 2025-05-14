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
    options: any[]
  }

const Select = ({label, name, onChange, value , options, placeholder= '-- --' }: SelectProps) => {
  return (
    <label htmlFor={name} className='label'>
        {label}
        <select 
            name={name} 
            id={name}
            className='input'
            onChange={(e)=>onChange(e)}
            value={value}
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
    </label>
  )
}

export default Select