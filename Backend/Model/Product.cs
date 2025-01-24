using System.Text.Json.Serialization;

namespace Question1.Model
{
    public class Product
    {
        [JsonIgnore]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }

        public ProductInventory Inventory { get; set; }
    }
}
