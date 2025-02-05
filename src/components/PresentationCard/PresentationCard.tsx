import{ useState } from 'react';
import './PresentationCard.scss';

function PresentationCard(event: object) {

    const { title, date, time, specialty, consumption, users, id } = event;
    

    const [isSubmit, setIsSubmit] = useState<boolean>(false)

    const handleSeeMore = ()=> {

    }

    const handleSubmit = ()=> {
        if(isSubmit){
            setIsSubmit(false)
        }
        else {
            setIsSubmit(true)
        }
    }

  return (
    <article
        className='presentation_card_container'
    >
        <div
            className='presentation_card_header'
        >
            <h3>Lieu de l'évent</h3>
            <div>X.X ★</div>
        </div>
        <div
            className='presentation_card_timestamp'
        >
            <p>ddd. DD mmm.</p>
            <p> - </p>
            <p>HH:MM</p>
        </div>
        <div
            className='presentation_card_content'
        >
            <p>Spécialité</p>
            <p> - </p>
            <p>Consommation</p>
        </div>
        <div
            className='presentation_card_thumbnails_container'>
            <div className='thumbnail_users'/>
            <div className='thumbnail_users'/>
            <div className='thumbnail_users'/>
            <div className='thumbnail_users'/>
        </div>
        <div
            className='presentation_card_footer'
        >
           
           <button
                onClick={handleSeeMore}
                className='btn btn-primary'
           >
                Plus
           </button>
           <button
                onClick={handleSubmit}
                className='btn btn-primary'
           >
                {isSubmit ? 'Annuler' : "S'inscrire"}
           </button>

        </div>

    </article>
  )
}

export default PresentationCard