import bcrypt from 'bcrypt';

export async function hashingPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPw = await bcrypt.hash(password, salt);

  return hashedPw;
}

export async function comparePassword(password: string, hashedPw: string) {
  return await bcrypt.compare(password, hashedPw);
}
