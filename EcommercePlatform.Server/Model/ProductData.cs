﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace EcommercePlatform.Server.Model
{
	public class ProductData
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }

		[BsonElement("Name")]
		public string Name { get; set; }
		public double Price { get; set; }
		public string Category { get; set; }
		public string Author { get; set; }
	}
}
