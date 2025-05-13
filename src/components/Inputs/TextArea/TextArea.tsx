import React from 'react'

interface TextAreaProps {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    ariaLabel?: string;
    placeholder?: string;
}; 


const TextArea = ({label, name, onChange, value, ariaLabel, placeholder}:TextAreaProps) => {

  return (
    <label 
        htmlFor={name}
        className='label'
    >
        {label}
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
    </label>
  )
}

export default TextArea