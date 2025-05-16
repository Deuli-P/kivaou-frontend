export interface UserProps {
    id: string;
    firstname: string;
    lastname: string;
    email?: string;
    photo_path?: string;
    user_type?: null | "admin"
    organization?:{
      id: string | null;
      name: string | null;
      role: 'OWNER' | 'MEMBER' | null;
    };
}

export interface OrganizationProps {
    id: string;
    name: string;
    owner: UserProps;
    address: AddressProps;
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
      firstname?: string;
      lastname?: string;
      photo_path?: string;
    };
    description: string;
    start_date: string;
    end_date: string;
    destination: PlaceProps;
    submitted?: boolean;
    users?: UserProps[];
    status?: 'started'|'deleted'| 'cancelled';
  };
  
export interface PlaceProps {
    id: string;
    name: string;
    speciality?: string;
    photo_path?: string;
    schedule?: DayProps[];
    service_type?: string;
    service_link?: string;
    phone?: string;
    google_page_link?: string;
    website?: string;
    note?: number;
    address: AddressProps;
}

export interface DayProps {
    day: string;
    morning: string | "";
    afternoon: string | "";
}

export interface AddressProps{
    id: string;
    number: number;
    street: string;
    city: string;
    postale_code: number;
    country: string;
    latitude?: number;
    longitude?: number;
}

