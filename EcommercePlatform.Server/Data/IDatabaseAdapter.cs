using System.Collections.Generic;
using System.Threading.Tasks;
using EcommercePlatform.Server.Model;

namespace EcommercePlatform.Server.Data
{
	public interface IDatabaseAdapter
	{
		Task<List<ProductData>> GetAllProductsAsync();

		Task<ProductData> GetProductDataById(string productId);

		Task<List<ProfileData>> GetAllProfilesAsync();

		Task<ProfileData> GetProfileDataById(string profileId);

		Task<List<CustomersServicesData>> GetAllCustomersServicesDataAsync();

		Task<CustomersServicesData> GetCustomersServiceDataById(string customerServiceId);

		Task<TransactionResult> PostNewCustomerServiceData(CustomersServicesData customersServicesData);

		Task<TransactionResult> UpdateCustomerServiceDataById(string customerServiceId, CustomersServicesData customersServicesData);
		
		Task<bool> DeleteCustomersServicesDataById(string customerServiceId);
	}
}
