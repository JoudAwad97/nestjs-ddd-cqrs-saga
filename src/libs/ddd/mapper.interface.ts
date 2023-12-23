import { Entity } from './entity.base';

export abstract class Mapper<
  DomainEntity extends Entity<any>,
  DbRecord,
  Response = any,
> {
  abstract toPersistence(entity: DomainEntity): DbRecord;
  abstract toDomain(record: DbRecord): DomainEntity;
  abstract toResponse(entity: DomainEntity): Response;
}
