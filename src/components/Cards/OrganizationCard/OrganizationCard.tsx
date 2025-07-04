import { useNavigate } from 'react-router-dom';
import { OrganizationProps } from '../../../utils/types';
import Button from '../../Button/Button';
import './organizationCard.scss';
import UserGroup from '../../User/UserGroup/UserGroup';
import UserThumbnail from '../../User/UserThumbnail/UserThumbnail';

interface OrganizationCardProps {
    item: OrganizationProps
    setOpen:(open: boolean) => void
    setRemoveOrganization:(organization: OrganizationProps | null) => void
};

const OrganizationCard = ({item, setOpen, setRemoveOrganization}:OrganizationCardProps) => {

    const navigate = useNavigate();

    const handleStartDeleteOrganization = async () => {
        setRemoveOrganization(item);
        setOpen(true);
    };

    const handleRedirect = () => {
        navigate(`/orga/${item.id}`);
    };

  return (
    <article className='card organization-card-container'>
        <div className="organization-card-header">
            <h3>{item.name}</h3>
            <div className="organization-card-header-owner-container">
                <UserThumbnail
                    user={item.owner}
                    size='s'
                />
                <span className='organization-card-header-owner'>{item.owner.firstname} {item.owner.lastname}</span>
            </div>
        </div>
        <p>Ville : {item.address?.postale_code} {item.address?.city}</p>
        <div className="organization-card-users-container">
                <UserGroup 
                    users={item.users ? item.users : []}
                    size='m'
                />
        </div>
        <div className="organization-card-btn-container">
            <Button
                label="Supprimer l'organisation"
                version='secondary'
                type='button'
                ariaLabel="Supprimer l'organisation"
                onClick={handleStartDeleteOrganization}
            />
            <Button
                label='Voir plus'
                version='primary'
                type='button'
                ariaLabel="Voir plus d'informations sur l'organisation"
                onClick={handleRedirect}
            />
        </div>
    </article>
  )
}

export default OrganizationCard