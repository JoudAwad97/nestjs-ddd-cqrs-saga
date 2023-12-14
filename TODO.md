1. Create project in a more modular ways that speaks for it (create author inside the content management (Post, Comment,Author with adaptor and translator) and keep the user Module, create a notification module as well)
2. Create a Common Domains that holds the "Author" in it and then use that entity in the "Post", "Comment"
3. Group Modules by there bounded context "directory"
4. create an example of Bounded Context Anti-corruption Layer (ACL) / Use Adaptor and Translator to fix the problem of converting the records
5. move all the repositories to the infrastructure layer, keeping there interfaces in the actual Domain Layer
6. create a "Factory" Example to hide a complex implementation of an Aggregate
7. Create a domain service for user that allow us to Authenticate the user with the User Entity
8. Global Error handlers for modular monolithic
