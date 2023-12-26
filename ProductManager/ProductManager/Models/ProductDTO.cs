using Microsoft.AspNetCore.Mvc;

namespace ProductManager.Models
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string Image { get; set; }
        public string fileName { get; set; }
    }
}
