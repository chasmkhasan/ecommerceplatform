using EcommercePlatform.Server.Data;
using EcommercePlatform.Server.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EcommercePlatform.Server.Controllers
{
	[Route("api/part1/productsData")]
	[ApiController]
	public class ProductController : ControllerBase
	{
		private MongoDbDatabase _database;

		public ProductController(MongoDbDatabase database)
		{
			_database = database;
		}


		[HttpGet]
		public async Task<IActionResult> ProductsDataList()
		{
			try
			{
				var productDataList = await _database.GetAllProductsAsync();

				if (productDataList.Count == 0)
				{
					return NoContent();
				}

				return Ok(productDataList);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}

		}

		[HttpGet]
		[Route("{productId}")]
		public async Task<IActionResult> GetProductDataById(string productId)
		{
			try
			{
				var productData = await _database.GetProductsByIdAsync(productId);

				if (productData.Id != productId)
				{
					return NoContent();
				}
				return Ok(productData);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
        }
	}
}
