export const usersQueryKey = ["super-admin", "users"] as const;

export const userDetailQueryKey = (userId: string) =>
    ["super-admin", "users", "detail", userId] as const;
