using System.Text.Json.Serialization;

namespace EcommercePlatform.Server.Model
{
	public class CustomersServicesData
	{
		[JsonPropertyName("service_id")]
		public Guid ServiceId { get; set; }

		[JsonPropertyName("customer_name")]
		public string CustomerName { get; set; }

		[JsonPropertyName("customer_email")]
		public string Email { get; set; }

		[JsonPropertyName("product_id")]
		public ProductData ProductID { get; set; }

		[JsonPropertyName("subject")]
		public string Subject { get; set; }

		[JsonPropertyName("description")]
		public string Description { get; set; }

	}
}
