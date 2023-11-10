namespace ProductManager.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public float TotalPrice { get; set; }
        public List<ProductCart> ProductCarts { get; set; } = new();
    }
}
