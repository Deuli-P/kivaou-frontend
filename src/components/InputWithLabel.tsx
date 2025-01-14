import {useState} from 'react';
import { InputWithLabelProps } from '../data/types';



const InputWithLabel = ({label, setValue, value, name, type='text'}:InputWithLabelProps) => {

    


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue((prev)=>({
            ...prev,
            [name]: newValue
        }))
      };

  return (
    <label
        className='label_with_input'
    >
        {label}
    <input 
        type={type}
        name={name}
        className='input'
        value={value}
        onChange={handleInputChange}
    />
    </label>
  )
}

export default InputWithLabel