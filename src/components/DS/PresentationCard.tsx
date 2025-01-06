import{ useState } from 'react'
import Button from './Button'

function PresentationCard() {

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
        className=''
    >
        <div
            className=''
        >
            <h3>Lieu de l'évent</h3>
            <div>X.X ★</div>
        </div>
        <div
            className=''
        >
            <p>ddd. DD mmm.</p>
            <p> - </p>
            <p>HH:MM</p>
        </div>
        <div>
            <p>Spécialité</p>
            <p> - </p>
            <p>Consommation</p>
        </div>
        <div>
            <div className=''/>
        </div>
        <div>
           <Button
                label='Voir plus'
                OnClick={handleSeeMore}
            />
           <Button
                label={isSubmit ? 'Annuler' : "S'inscrire"}
                OnClick={handleSubmit}
            />

        </div>

    </article>
  )
}

export default PresentationCard