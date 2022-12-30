import { ContactDomainEntity } from "../contact-domain";
import { ContactResponseEntity } from "../contact-response";

export const toDomainEntity = (
    contact: ContactResponseEntity
): ContactDomainEntity => ({
    contactPerson: contact.contact_person,
    email: contact.email,
    telephone: contact.telephone,
    website: contact.website,
});
