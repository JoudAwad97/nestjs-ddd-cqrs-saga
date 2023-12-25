import { DynamicModule, InjectionToken, Type } from '@nestjs/common';

export function generateUseContractsFunction<TRepository, TMapper>(
  module: Type<any>,
  repositoryType: new (...args: any[]) => TRepository,
  mapperType: new (...args: any[]) => TMapper,
  repositoryContracts: InjectionToken[] = [],
  mapperContracts: InjectionToken[] = [],
): DynamicModule {
  return {
    module,
    providers: [
      ...repositoryContracts.map((provider) => ({
        provide: provider,
        useClass: repositoryType,
      })),
      ...mapperContracts.map((provider) => ({
        provide: provider,
        useClass: mapperType,
      })),
    ],
    exports: [...repositoryContracts, ...mapperContracts],
  };
}
