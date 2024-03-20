using EcommercePlatform.Server.Model;
using Microsoft.AspNetCore.Mvc;

namespace EcommercePlatform.Server.Controllers
{
	[Route("api/profile")]
	[ApiController]
	public class ProfileController : Controller
	{
		[HttpGet]
		public IActionResult Get([FromBody] ProfileData profileData)
		{
			return Ok("ProfileData coming from Backend");
		}

		[HttpPost]
		public IActionResult Post([FromBody] ProfileData profileData)
		{
			return Ok("ProfileData coming from Backend");
		}

		[HttpPut]
		public IActionResult Put([FromBody] ProfileData profileData)
		{
			return Ok("ProfileData coming from Backend");
		}

		[HttpDelete]
		public IActionResult Delete([FromBody] ProfileData profileData)
		{
			return Ok("ProfileData coming from Backend");
		}
	}
}
