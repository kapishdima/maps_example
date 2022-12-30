export type ContactPerson = { [key: string]: string };
export type Contact = {
    contact_person: ContactPerson;
    email: string;
    telephone: string;
    website: string;
};
