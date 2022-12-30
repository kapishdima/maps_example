import { UserDomainEntity } from "../user-domain";
import { UserResponseEntity } from "../user-response";

export const toDomainEntity = (user: UserResponseEntity): UserDomainEntity => {
    return {
        id: user.id,
        countryId: user.country_id,
        name: user.name,
        email: user.email,
        role: user.isSuperAdmin ? "superadmin" : "admin",
    };
};
