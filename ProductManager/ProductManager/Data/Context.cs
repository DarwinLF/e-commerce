namespace ProductManager.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<ProductCart> ProductsCarts { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
