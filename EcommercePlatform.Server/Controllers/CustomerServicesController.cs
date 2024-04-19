using EcommercePlatform.Server.Data;
using EcommercePlatform.Server.Model;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace EcommercePlatform.Server.Controllers
{
	[Route("api/part3/CustomerServicesData")]
	[ApiController]
	public class CustomerServicesController : ControllerBase
	{
		private readonly MongoDbDatabase _database;

		public CustomerServicesController(MongoDbDatabase database) =>
			_database = database;


		[HttpGet]
		//public async Task<List<CustomersServicesData>> CustomerServiceList() =>
		//	await _dataBase.GetAllServicesAsync();

		public async Task<IActionResult> CustomerServiceList()
		{
			try
			{
				var serviceList = await _database.GetAllServicesAsync();

				if (serviceList.Count == 0)
				{
					return NoContent();
				}

				return Ok(serviceList);
			}
			catch (Exception)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}


		[HttpGet]
		[Route("{id}")]
		public async Task<IActionResult> GetCustomerServiceDataById(string id)
		{
			try
			{
				var serviceData = await _database.GetServicesByIdAsync(id);

				if (serviceData.Id != id)
				{
					return NoContent();
				}

				return Ok(serviceData);
			}
			catch (Exception)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}

		[HttpGet]
		[Route ("ByEmail/{email}")]
		public async Task<IActionResult> GetCustomerServiceDataByEmail(string email)
		{
			try
			{
				var serviceData = await _database.GetServicesDataByEmailAsync(email);

				if(serviceData.Count == 0)
				{
					return NoContent();
				}
				return Ok(serviceData);
			}
			catch (Exception)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}

		[HttpPost]
		public async Task<IActionResult> NewPostService(CustomersServicesData newServicesData)
		{
			try
			{
				newServicesData.Id = ObjectId.GenerateNewId().ToString();

				await _database.CreateServicesAsync(newServicesData);

				return CreatedAtAction(nameof(CustomerServiceList), new { id = newServicesData.Id }, newServicesData);
			}
			catch (Exception)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}

		}

		//[HttpDelete]
		//[Route("{customerServiceId}")] // SQL Patter Both will work

		[HttpDelete("{id:length(24)}")] // ASP.NET MongoPattern
		public async Task<IActionResult> DeleteServiceDataById(string id)
		{
			try
			{
				var servicesData = await _database.GetServicesByIdAsync(id);

				if (servicesData is null)
				{
					return NotFound();
				}

				await _database.RemoveServiceAsync(id);

				return NoContent();
			}
			catch (Exception)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}
	}
}
