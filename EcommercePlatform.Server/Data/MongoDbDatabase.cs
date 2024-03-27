using MongoDB.Bson;
using MongoDB.Driver;
using EcommercePlatform.Server.Model;
using Microsoft.Extensions.Options;

namespace EcommercePlatform.Server.Data
{
	public class MongoDbDatabase
	{
		private readonly IMongoCollection<CustomersServicesData> _serviceCollection;
		private readonly IMongoCollection<ProductData> _productCollection;
		private readonly IMongoCollection<ProfileData> _profileCollection;

		public MongoDbDatabase(
			IOptions<ECommerceDataBaseSetting> eCommerceDataBaseSetting)
		{
			var mongoClient = new MongoClient(
				eCommerceDataBaseSetting.Value.ConnectionString);
			var mongoDatabase = mongoClient.GetDatabase(
				eCommerceDataBaseSetting.Value.DatabaseName);
			_serviceCollection = mongoDatabase.GetCollection<CustomersServicesData>(
				eCommerceDataBaseSetting.Value.ServiceCollectionName);
			_productCollection = mongoDatabase.GetCollection<ProductData>(
				eCommerceDataBaseSetting.Value.ProductCollectionName);
			_profileCollection = mongoDatabase.GetCollection<ProfileData>(
				eCommerceDataBaseSetting.Value.ProfileCollectionName);
		}

		public async Task<List<CustomersServicesData>> GetAllServicesAsync() =>
			await _serviceCollection.Find(_ => true).ToListAsync();

		public async Task<CustomersServicesData> GetServicesByIdAsync(string serviceId) =>
			await _serviceCollection.Find(x => x.Id == serviceId).FirstOrDefaultAsync();




		public async Task<List<ProductData>> GetAllProductsAsync() =>
			await _productCollection.Find(_ => true).ToListAsync();

		public async Task<ProductData> GetProductsByIdAsync(string productId) =>
			await _productCollection.Find(x => x.Id == productId).FirstOrDefaultAsync();




		public async Task<List<ProfileData>> GetAllProfileAsync() =>
			await _profileCollection.Find(_ => true).ToListAsync();

		public async Task<ProfileData> GetProfilesByIdAsync(string customerId) =>
			await _profileCollection.Find(x => x.Id == customerId).FirstOrDefaultAsync();


	}
}
