namespace ProductManager.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
        public List<ProductCart> ProductCarts { get; set; } = new();
    }
}
