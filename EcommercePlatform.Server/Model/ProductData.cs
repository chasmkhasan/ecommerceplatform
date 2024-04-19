using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace EcommercePlatform.Server.Model
{
	public class ProductData
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }

		[BsonElement("Name")] // Ensure this matches the case and name in the MongoDB document
		public string Name { get; set; }

		[BsonElement("Price")] // Ensure this matches the case and name in the MongoDB document
		public double Price { get; set; }

		[BsonElement("Category")] // Ensure this matches the case and name in the MongoDB document
		public string Category { get; set; }

		[BsonElement("Author")] // Ensure this matches the case and name in the MongoDB document
		public string Author { get; set; }
	}
}
