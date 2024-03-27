using System.Collections.Generic;
using System.Threading.Tasks;
using EcommercePlatform.Server.Model;

namespace EcommercePlatform.Server.Data
{
	public interface IDatabaseAdapter
	{
		Task<List<ProductData>> GetAllProductsAsync();

		Task<ProductData> GetProductDataById(string productDataId);

		Task<List<ProfileData>> GetAllProfilesAsync();

		Task<ProfileData> GetProfileDataById(string profileDataId);

		Task<List<CustomersServicesData>> GetAllCustomersServicesDataAsync();

		Task<CustomersServicesData> GetCustomersServiceDataById(string customerServiceDataId);

		Task<TransactionResult> PostNewCustomerServiceData(CustomersServicesData customersServicesData);

		Task<TransactionResult> UpdateCustomerServiceDataById(string customerServiceDataId, CustomersServicesData customersServicesData);
		
		Task<bool> DeleteCustomersServicesDataById(string customerServiceDataId);
	}
}
