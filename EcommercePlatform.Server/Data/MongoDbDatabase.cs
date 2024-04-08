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

		//CustomerService Data
		public async Task<List<CustomersServicesData>> GetAllServicesAsync() =>
			await _serviceCollection.Find(_ => true).ToListAsync();

		public async Task<CustomersServicesData> GetServicesByIdAsync(string serviceId) =>
			await _serviceCollection.Find(x => x.Id == serviceId).FirstOrDefaultAsync();

		public async Task CreateServicesAsync(CustomersServicesData createServicesData) =>
			await _serviceCollection.InsertOneAsync(createServicesData);

		public async Task RemoveServiceAsync(string id) =>
			await _serviceCollection.DeleteOneAsync(x => x.Id == id);


		//ProductData
		public async Task<List<ProductData>> GetAllProductsAsync() =>
			await _productCollection.Find(_ => true).ToListAsync();

		public async Task<ProductData> GetProductsByIdAsync(string productId) =>
			await _productCollection.Find(x => x.Id == productId).FirstOrDefaultAsync();

		public async Task CreateProductAsync(ProductData createProductData) =>
			await _productCollection.InsertOneAsync(createProductData);

		public async Task RemoveProductAsync(string id) =>
			await _productCollection.DeleteOneAsync(x => x.Id == id);



		//Profile Data
		public async Task<List<ProfileData>> GetAllProfileAsync() =>
			await _profileCollection.Find(_ => true).ToListAsync();

		public async Task<ProfileData> GetProfilesByIdAsync(string customerId) =>
			await _profileCollection.Find(x => x.Id == customerId).FirstOrDefaultAsync();

		public async Task CreateProfileAsync(ProfileData createProfileData) =>
			await _profileCollection.InsertOneAsync(createProfileData);

		public async Task RemoveProfileAsync(string id) =>
			await _profileCollection.DeleteOneAsync(x => x.Id == id);



		//Logging
		public async Task<ProfileData> GetAuthenticationByUsernameAndPasswordAsync(string userName, string hashedPassWord) =>
			await _profileCollection.Find(x => x.UserName == userName && x.PassWord == hashedPassWord).FirstOrDefaultAsync();

	}
}
