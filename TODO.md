# Please open a PR to add any TODO so i can work on it and improve the project i am more than happy to accept any comments to improve the code and project in general

1. review that the application layer do not know anything about the DTO that is passed from the controllers, Application layer should only be aware of commands and queries, while controller should be only aware of Dtos
2. consider refactoring from "interfaces" for ports into "abstraction classes" (Could not do this because of multiple implementation)
3. review the structure of each module we have with the one in the nestjs official course
4. consider using built-in Prisma modeling for mapper instead of defining our own database models
5. consider moving the mappers to use a "static" methods instead of injecting them every time
6. Review the "Food Ordering" app to check for the communication between DTO and controller (check if we can call directly data from repository into a DTO instead of converting it into entity)
7. Look for the Read-Models and how they work (we can create a view for the read models in the domain) check nestjs course for the "Read-Models" directory in the Domain folder
8. Re-visit the shared directory to make it DDD compatible
9. Re-visit saga to add a real implementation of it
10. Find a better way of implementing the modules each time (Module initialization)
