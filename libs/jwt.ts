import jwt, { JwtPayload } from 'jsonwebtoken';

const AUTH_SECRET = process.env.AUTH_SECRET!;

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: '1h',
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION,
) {
  const token = jwt.sign(payload, AUTH_SECRET, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, AUTH_SECRET);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
