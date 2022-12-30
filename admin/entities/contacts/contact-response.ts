export type ContactResponseEntity = {
    id: number;
    contact_person: { [key: string]: string };
    email: string;
    telephone: string;
    website: string;
};
