using EcommercePlatform.Server.Data;
using Microsoft.AspNetCore.Mvc;

namespace EcommercePlatform.Server.Controllers
{
	[Route("api/part3/CustomerServicesData")]
	[ApiController]
	public class CustomerServicesController : ControllerBase
	{
		private IDatabaseAdapter _database;

		public CustomerServicesController(IDatabaseAdapter database)
		{
			_database = database;
		}

		[HttpGet]
		public async Task<IActionResult> CustomerServiceList()
		{
			try
			{
				var serviceList = await _database.GetAllCustomersServicesDataAsync();

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
				var serviceData = await _database.GetCustomersServiceDataById(customerServiceId);

				if(serviceData.ServiceId != customerServiceId)
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
