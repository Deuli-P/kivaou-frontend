export interface UserProps {
    firstname: string;
    lastname: string;
    email : string;
    photo_path?: string;
    organization:{
      id: string | null;
      name: string | null;
    };
  }
  