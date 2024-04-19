using EcommercePlatform.Server.Data;
using EcommercePlatform.Server.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

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
			catch (Exception)
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
			catch (Exception)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}

		[HttpGet]
		[Route("ByAuthor{author}")]
		public async Task<IActionResult> GetProductDataByAuthor(string author)
		{
			try
			{
				var productData = await _database.GetProductDataByAuthor(author);

				if(productData.Count == 0)
				{
					return NoContent();
				}
				return Ok(productData);
			}
			catch (Exception)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}


		[HttpPost]
		public async Task<IActionResult> PostProduct(ProductData newProductData)
		{
			try
			{
				newProductData.Id = ObjectId.GenerateNewId().ToString();

				await _database.CreateProductAsync(newProductData);

				return CreatedAtAction(nameof(ProductsDataList), new { id = newProductData.Id }, newProductData);
			}
			catch (Exception)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}

		[HttpDelete("{id:length(24)}")]
		public async Task<IActionResult> DeleteProductDataById(string id)
		{
			try
			{
				var productData = await _database.GetProductsByIdAsync(id);

				if (productData is null)
				{
					return NotFound();
				}

				await _database.RemoveProductAsync(id);

				return NoContent();
			}
			catch (Exception)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}
	}
}
