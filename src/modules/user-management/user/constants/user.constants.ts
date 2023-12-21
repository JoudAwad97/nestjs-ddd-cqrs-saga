/**
 * central place for all user related constants
 */

/**
 * validation constants this is used across the domain in two places
 * 1. in the database schema validation with ZOE
 * 2. in the DTO validation with class-validator
 */
export const EMAIL_MAX_LENGTH = 320;

export const PASSWORD_MIN_LENGTH = 5;
export const PASSWORD_MAX_LENGTH = 50;

export const FIRST_NAME_MAX_LENGTH = 50;
export const FIRST_NAME_MIN_LENGTH = 3;

export const LAST_NAME_MAX_LENGTH = 50;
export const LAST_NAME_MIN_LENGTH = 3;

export const NICK_NAME_MAX_LENGTH = 50;
export const NICK_NAME_MIN_LENGTH = 3;
