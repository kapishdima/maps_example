import { blackSeaSchema } from "./blackSeaSchema";
import { countrySchema } from "./countrySchema";
import { settingSchema } from "./settingSchema";
import { articleSchema } from "./articleSchema";
import { eventSchema } from "./eventSchema";
import { attractionSchema } from "./attractionSchema";
import { horecaSchema } from "./horecaSchema";
import { contactPersonSchema } from "./contactPersonSchema";
import { locationSchema } from "./locationSchema";
import { waySchema } from "./waySchema";
import { winerySchema } from "./winerySchema";
import { grapeSchema } from "./grapeSchema";
import { agencySchema } from "./agencySchema";
import { adminSchema } from "./adminSchema";

const schemes = {
    winery: winerySchema,
    location: locationSchema,
    contact: contactPersonSchema,
    way: waySchema,
    horeca: horecaSchema,
    attraction: attractionSchema,
    grape: grapeSchema,
    agency: agencySchema,
    event: eventSchema,
    article: articleSchema,
    settings: settingSchema,
    country: countrySchema,
    admin: adminSchema,
    blackSea: blackSeaSchema,
};
export const createValidationSchema = (
    requiredLocales,
    schemaName,
    user: boolean = false
) => {
    if (!schemes[schemaName]) {
        throw new Error(`Schema ${schemaName} not found`);
    }
    return schemes[schemaName](requiredLocales, user);
};
