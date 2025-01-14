export type InputWithLabelProps ={
    label : string;
    value : string  | null;
    setValue: React.Dispatch<React.SetStateAction<{ [key: string]: string | null }>>;
    type?: string;
    name: string;
}