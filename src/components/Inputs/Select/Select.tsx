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
  }

const Select = ({label, name, onChange, value , required=false, options, placeholder= '-- --' }: SelectProps) => {
  return (
    <div className='input-container'>
    <label htmlFor={name} className='label'>
        {label}
        {required && <span className='required'>*</span>}
    </label>
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
    </div>
  )
}

export default Select