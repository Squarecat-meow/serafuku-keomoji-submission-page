import { SignJWT } from "jose";

export const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEYS);

export async function signJwt(payload: Record<string, string>) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(new Date())
    .sign(jwtSecret);

  return jwt;
}
