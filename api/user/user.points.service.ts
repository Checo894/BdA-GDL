import { getUser } from "./user.service";

export const getUserPoints = async (): Promise<number> => {
    const user = await getUser();
    return user.map((u) => u.points_balance).reduce((acc, val) => acc + val, 0);
};
