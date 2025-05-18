import './tag.scss';

interface TagProps {
  children: React.ReactNode;
};

const Tag = ({children}: TagProps) => {


  return (
    <div className='tag-container'>
        <span>{children}</span>
    </div>
  )
}

export default Tag