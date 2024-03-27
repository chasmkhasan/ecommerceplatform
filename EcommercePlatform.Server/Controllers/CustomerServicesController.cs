using EcommercePlatform.Server.Data;
using EcommercePlatform.Server.Model;
using Microsoft.AspNetCore.Mvc;

namespace EcommercePlatform.Server.Controllers
{
	[Route("api/part3/CustomerServicesData")]
	[ApiController]
	public class CustomerServicesController : ControllerBase
	{
		private readonly MongoDbDatabase _dataBase;

		public CustomerServicesController(MongoDbDatabase dataBase) =>
			_dataBase = dataBase;

		
		[HttpGet]
		//public async Task<List<CustomersServicesData>> CustomerServiceList() =>
		//	await _dataBase.GetAllServicesAsync();

		public async Task<IActionResult> CustomerServiceList()
		{
			try
			{
				var serviceList = await _dataBase.GetAllServicesAsync();

				if (serviceList.Count == 0)
				{
					return NoContent();
				}

				return Ok(serviceList);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}

		[HttpGet]
		[Route("{customerServiceId}")]
		public async Task<IActionResult> GetCustomerServiceDataById(string customerServiceId)
		{
			try
			{
				var serviceData = await _dataBase.GetServicesByIdAsync(customerServiceId);

				if(serviceData.Id != customerServiceId)
				{
					return NoContent();
				}

				return Ok(serviceData);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}

	}
}
