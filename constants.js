export const DB_NAME = "Greige OrderDelivery Management SRPK-Prashant";
export const accessTokenCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 *1000,
}

export const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 28 * 24 * 60 * 60 *1000,
}