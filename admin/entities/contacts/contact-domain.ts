type ContactPerson = { [key: string]: string };

export type ContactDomainEntity = {
    contactPerson: ContactPerson;
    email: string;
    telephone: string;
    website: string;
};
