using System.Text.Json.Serialization;

namespace EcommercePlatform.Server.Model
{
	public class ProfileData
	{
		[JsonPropertyName("customer_id")]
		public string CustomerId { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		[JsonPropertyName("email")]
		public string Email { get; set; }
	}
}
