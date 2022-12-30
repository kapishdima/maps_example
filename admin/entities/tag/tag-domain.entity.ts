import { CountryDomainEntity } from "entities/countries";

export class TagDomainEntity {
    constructor(
        private readonly id: number,
        private readonly name: string,
        private readonly countryId: number
    ) {}

    getId() {
        return this.id;
    }

    getName(countries?: CountryDomainEntity[]) {
        if (!countries) {
            return this.name;
        }

        const country = countries.find(
            (country) => country.id === this.countryId
        );
        return `${this.name} ${country.slug.toUpperCase()}`;
    }

    getContryId() {
        return this.countryId;
    }
}
