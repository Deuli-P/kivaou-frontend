import { useState } from 'react'



const Button = (props:any) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { label, onClick } = props 
  return (
    <button
        className={``}
        onClick={onClick}
    >
        {label}
    </button>
  )
}

export default Button