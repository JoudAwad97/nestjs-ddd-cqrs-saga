import { Option } from 'oxide.ts';

/*  Most of repositories will probably need generic 
    save/find/delete operations, so it's easier
    to have some shared interfaces.
    More specific queries should be defined
    in a respective repository.
*/

export interface RepositoryPort<Entity> {
  // add more methods depending on the implementations
  create(entity: Entity): Promise<Entity>;
  findById(id: string): Promise<Option<Entity>>;
  delete(id: string): Promise<boolean>;
}
