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

		[BsonElement("Name")] // Ensure this matches the case and name in the MongoDB document
		public string Name { get; set; }

		[BsonElement("Email")] // Ensure this matches the case and name in the MongoDB document
		public string Email { get; set; }

		[BsonElement("ProductID")] // Ensure this matches the case and name in the MongoDB document
		public string ProductID { get; set; }

		[BsonElement("Subject")] // Ensure this matches the case and name in the MongoDB document
		public string Subject { get; set; }

		[BsonElement("Description")] // Ensure this matches the case and name in the MongoDB document
		public string Description { get; set; }

	}
}
