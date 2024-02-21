namespace ProductManager.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
        public List<ProductCart> ProductCarts { get; set; } = new();
    }
}
