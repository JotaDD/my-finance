import * as bcrypt from 'bcrypt';

export function encode(rawString: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hash(rawString, SALT);
}

export async function compare(rawString: string, hash: string) {
  return bcrypt.compareSync(rawString, hash);
}
