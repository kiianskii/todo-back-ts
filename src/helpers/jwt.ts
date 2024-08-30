import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

export const createToken = (payload: { id: string }) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

// export const verifyToken = (token: string) => {
//   try {
//     const payload = jwt.verify(token, JWT_SECRET);
//     return { error: null, payload };
//   } catch (error) {
//     return { error, payload: null };
//   }
// };

// interface TokenPayload {
//   id: string;
// }
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

// export const verifyToken = (
//   token: string
// ): { error: Error | null; payload: TokenPayload | null } => {
//   try {
//     const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
//     return { error: null, payload: payload as TokenPayload };
//   } catch (error) {
//     if (isError(error)) {
//       return { error, payload: null };
//     }

//     return { error: new Error("Unknown error"), payload: null };
//   }
// };
export const verifyToken = (
  token: string
): { error: Error | null; payload: { id: string } | null } => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    return { error: null, payload };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error("Unknown error"),
      payload: null,
    };
  }
};
