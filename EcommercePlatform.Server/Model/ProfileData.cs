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

		[BsonElement("Name")]
		public string Name { get; set; }
		public string Email { get; set; }
	}
}
