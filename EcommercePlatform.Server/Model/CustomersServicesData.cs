using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace EcommercePlatform.Server.Model
{
	public class CustomersServicesData
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }

		[BsonElement("Name")]
		public string Name { get; set; }
		public string Email { get; set; }
		public string ProductID { get; set; }
		public string Subject { get; set; }
		public string Description { get; set; }

	}
}
