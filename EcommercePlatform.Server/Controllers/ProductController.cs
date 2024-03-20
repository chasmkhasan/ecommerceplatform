using EcommercePlatform.Server.Model;
using Microsoft.AspNetCore.Mvc;

namespace EcommercePlatform.Server.Controllers
{
	[Route("api/products")]
	[ApiController]
	public class ProductController : Controller
	{
		//[HttpGet]
		//public IActionResult Get([FromBody] ProductData productData)
		//{
		//	return Ok("Product data talking from Backend");
		//}

		[HttpGet]
		public IActionResult Get()
		{
			return Ok("Product data talking from Backend");
		}
	}
}
