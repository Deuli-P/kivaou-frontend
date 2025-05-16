import React from 'react'
import "./../inputs.scss";


interface TextAreaProps {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    ariaLabel?: string;
    placeholder?: string;
    required?: boolean;
}; 


const TextArea = ({label, name, onChange, value, ariaLabel, placeholder, required}:TextAreaProps) => {

  return (
    <div className='input-container'>
    <label 
        htmlFor={name}
        className='label'
    >
        {label}
        {required && <span className='required'>*</span>}
    </label>
        <textarea 
            id={name}
            name={name}
            value={value}
            rows={5} 
            onChange={(e)=>onChange(e)}
            className='textarea'
            aria-label={ariaLabel}
            placeholder={placeholder}
        />
    </div>
  )
}

export default TextArea