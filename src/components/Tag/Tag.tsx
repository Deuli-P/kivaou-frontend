import './tag.scss';



const Tag = ({children}) => {


  return (
    <div className='tag-container'>
        <span>{children}</span>
    </div>
  )
}

export default Tag