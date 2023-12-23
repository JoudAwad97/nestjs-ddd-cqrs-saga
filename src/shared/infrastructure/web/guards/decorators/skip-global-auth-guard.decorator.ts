import { SetMetadata } from '@nestjs/common';

export const SKIP_GLOBAL_AUTH_GUARD = 'SkipGlobalAuthGuard';
export const SkipGlobalAuthGuard = function () {
  return SetMetadata(SKIP_GLOBAL_AUTH_GUARD, true);
};
