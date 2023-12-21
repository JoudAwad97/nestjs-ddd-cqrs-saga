2. Create a Common Domains that holds the "Author" in it and then use that entity in the "Post", "Comment"
3. Group Modules by there bounded context "directory"
4. create an example of Bounded Context Anti-corruption Layer (ACL) / Use Adaptor (Request Sending) and Translator (Translate data to local bounded context understanding) to fix the problem of converting the records
5. create a "Factory" Example to hide a complex implementation of an Aggregate (Comment With Author)
6. Create a domain service for user that allow us to Authenticate the user with the User Entity
7. Global Error handlers for modular monolithic
8. How to model the Post with Author as an aggregate

---

# communication between bounded context

consider the usage of the following

1. Anti-corruption layer
2. Shared Kernel
3. Customer/Supplier

---

# Notes

- when mapping a module to a bounded context, we map the module to a sub-domain not the whole bounded context
