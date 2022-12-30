import { useAuthService } from "app/hooks";

import { UserResponseEntity } from "entities/user";
import { UserService, UserStore } from "processes/user";

export const useGetMe = () => {
    const authService = useAuthService();
    const userService = new UserService(new UserStore());

    const fetchUser = async () => {
        try {
            const userFromStore = userService.getUser();

            if (userFromStore) {
                return userFromStore;
            }

            const userFromApi: UserResponseEntity = await authService.getMe();
            const savedUser = userService.saveUser(userFromApi);

            return savedUser;
        } catch (error) {
            if (error.status === 401) {
                return null;
            }
        }
    };

    return { fetchUser };
};
