export interface UserProps {
    id: string;
    firstname: string;
    lastname: string;
    email?: string;
    photo_path?: string;
    organization?:{
      id: string | null;
      name: string | null;
    };
}

export interface OrganizationProps {
    id: string;
    name: string;
    owner: UserProps;
    address: {
        street: string;
        city: string;
        postal_code: number;
        country: string;
    };
}

export interface EventProps {
    id: string;
    title: string;
    organization: {
      id: string;
      name: string;
    };
    owner: {
      id: string;
      firstname: string;
      lastname: string;
      photo_path: string;
    };
    description: string;
    start_date: string;
    end_date: string;
    address? : {
      id: string;
      number: number;
      street: string;
      city: string;
      postal_code: number;
      country: string;
    };
  };
  
export interface PlaceProps {
    id: string;
    name: string;
    speciality?: string;
    photo_path?: string;
    address: {
        street: string;
        city: string;
        postal_code: number;
        country: string;
    }
}