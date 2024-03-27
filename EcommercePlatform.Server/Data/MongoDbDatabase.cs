using MongoDB.Bson;
using MongoDB.Driver;
using EcommercePlatform.Server.Model;

namespace EcommercePlatform.Server.Data
{
	public class MongoDbDatabase : IDatabaseAdapter
	{
		public async Task<List<ProductData>> GetAllProductsAsync()
		{
			var collection = GetCollection("EcommercePlatform", "Products_Data");
			var productsDocuments = collection.Find(_=> true). ToListAsync();

			var productsList = new List<ProductData>();

			if(productsDocuments == null) return productsList;
			foreach(var productDocument in await productsDocuments)
			{
				productsList.Add(ConvertBsonToProductData(productDocument));
			}
			return productsList;
		}

		public async Task<ProductData> GetProductDataById(string productId)
		{
			var collection = GetCollection("EcommercePlatform", "Products_Data");
			var productCursor = await collection
				.FindAsync(Builders<BsonDocument>.Filter.Eq("product_id", productId));

			var productDocument = productCursor.FirstOrDefault();
			var productData = ConvertBsonToProductData(productDocument);

			if (productData == null)
			{
				return new ProductData();
			}

			return productData;
		}

		public async Task<List<ProfileData>> GetAllProfilesAsync()
		{
			var collection = GetCollection("EcommercePlatform", "Profiles_Data");
			var profileDocuments = collection.Find(_=> true). ToListAsync();

			var profileList = new List<ProfileData>();

			if (profileDocuments == null) return profileList;
			foreach(var profileDocument in await profileDocuments)
			{
				profileList.Add(ConvertBsonToProfileData(profileDocument));
			}

			return profileList;
		}

		public async Task<ProfileData> GetProfileDataById(string profileId)
		{
			var collection = GetCollection("EcommercePlatform", "Profiles_Data");
			var profileCursor = await collection
				.FindAsync(Builders<BsonDocument>.Filter.Eq("customer_id", profileId));

			var profileDocument = profileCursor.FirstOrDefault();
			var profileData = ConvertBsonToProfileData(profileDocument);

			if (profileData == null)
			{
				return new ProfileData();
			}

			return profileData;
		}

		public async Task<List<CustomersServicesData>> GetAllCustomersServicesDataAsync()
		{
			var collection = GetCollection("EcommercePlatform", "Customers_Services_Data");
			var servicesDocument = collection.Find(_=> true). ToListAsync();

			var serviceList = new List<CustomersServicesData>();

			if(servicesDocument == null) return serviceList;
			foreach (var serviceDocument in await servicesDocument)
			{
				serviceList.Add(ConvertBsonToCustomerServiceData(serviceDocument));
			}
			return serviceList;
		}

		public async Task<CustomersServicesData> GetCustomersServiceDataById(string customerServiceId)
		{
			var collection = GetCollection("EcommercePlatform", "Customers_Services_Data");
			var serviceCursor = await collection
				.FindAsync(Builders<BsonDocument>.Filter.Eq("service_id", customerServiceId));
			
			var serviceDocument = serviceCursor.FirstOrDefault();
			var serviceData = ConvertBsonToCustomerServiceData(serviceDocument);

			if(serviceData == null)
			{
				return new CustomersServicesData();
			}

			return serviceData;
		}

		public async Task<bool> DeleteCustomersServicesDataById(string customerServiceId)
		{
			var collection = GetCollection("EcommercePlatform", "Customers_Services_Data");
			var result = await collection.DeleteOneAsync(
				Builders<BsonDocument>.Filter.Eq("service_id", customerServiceId));

			return result.DeletedCount > 0;
		}

		//Under Process
		public Task<TransactionResult> PostNewCustomerServiceData(CustomersServicesData customersServicesData)
		{
			throw new NotImplementedException();
		}

		public Task<TransactionResult> UpdateCustomerServiceDataById(string customerServiceId, CustomersServicesData customersServicesData)
		{
			throw new NotImplementedException();
		}


		//MongoDB Connection via MongoDV driver in dependency
		private IMongoCollection<BsonDocument> GetCollection (
			string databaseName, string collectionName)
		{
			var client = new MongoClient();
			var database = client.GetDatabase (databaseName);
			var collection = database.GetCollection<BsonDocument> (collectionName);
			return collection;
		}

		//Convert Json(Bson) to .Net via Class
		private ProductData ConvertBsonToProductData(BsonDocument productDocument)
		{
			if (productDocument == null) return null;

			return new ProductData
			{
				ProductId = productDocument["product_id"].AsString,
				Name = productDocument["name"].AsString,
				Price = productDocument["price"].AsDouble,
				Category = productDocument["category"].AsString,
				Author = productDocument["author"].AsString,
			};
		}

		private ProfileData ConvertBsonToProfileData(BsonDocument profileDocument)
		{
			if (profileDocument == null) return null;

			return new ProfileData
			{
				CustomerId = profileDocument["customer_id"].AsString,
				Name = profileDocument["name"].AsString,
				Email = profileDocument["email"].AsString,
			};
		}

		private CustomersServicesData ConvertBsonToCustomerServiceData(BsonDocument serviceDocument)
		{
			if (serviceDocument == null) return null;

			return new CustomersServicesData
			{
				ServiceId = serviceDocument["service_id"].AsString,
				CustomerName = serviceDocument["customer_name"].AsString,
				Email = serviceDocument["customer_email"].AsString,
				ProductID = serviceDocument["product_id"].AsString,
				Subject = serviceDocument["subject"].AsString,
				Description = serviceDocument["description"].AsString,
			};
		}

		
	}
}
