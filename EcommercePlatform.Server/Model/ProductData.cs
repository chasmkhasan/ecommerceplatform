using System.Text.Json.Serialization;

namespace EcommercePlatform.Server.Model
{
	public class ProductData
	{
		[JsonPropertyName("product_id")]
		public Guid ProductId { get; set; }
		
		[JsonPropertyName("name")]
		public string Name { get; set; }
		
		[JsonPropertyName("price")]
		public double Price { get; set; }

		[JsonPropertyName("category")]
		public string Category { get; set; }

		[JsonPropertyName("author")]
		public string Author { get; set; }
	}
}
