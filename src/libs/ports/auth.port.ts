export type AuthTokens = {
  idToken: string | null;
  refreshToken: string | null;
  expirationTime: string | null;
};

/**
 * Basic implementation in case of using 3rd party providers like Firebase you will need to use a mapper to map
 * the fields to this required interface
 */
export type AuthServiceUserRecord = {
  id: string;
  email: string;
};

export interface IAuthServicePort {
  /**
   * create an account in the 3rd party system and return the user ID
   * @param email
   * @param password
   * @returns the created user ID
   */
  signup(email: string, password: string): Promise<string>;

  login(email: string, password: string): Promise<AuthTokens>;

  findAccountByEmail(email: string): Promise<AuthServiceUserRecord>;
}
