using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace EcommercePlatform.Server.Model
{
	public class ProfileData
	{

		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }

		[BsonElement("Name")] // Ensure this matches the case and name in the MongoDB document
		public string Name { get; set; }

		[BsonElement("Email")] // Ensure this matches the case and name in the MongoDB document
		public string Email { get; set; }

		[BsonElement("UserName")] // Ensure this matches the case and name in the MongoDB document
		public string UserName { get; set; }

		[BsonElement("PassWord")] // Ensure this matches the case and name in the MongoDB document
		public string PassWord { get; set; }

	}
}
