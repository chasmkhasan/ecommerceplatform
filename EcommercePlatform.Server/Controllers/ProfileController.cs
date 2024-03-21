using EcommercePlatform.Server.Model;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;

namespace EcommercePlatform.Server.Controllers
{
	[Route("api/profile")]
	[ApiController]
	public class ProfileController : Controller
	{
		private static List<ProfileData> profiles = new List<ProfileData>();

		[HttpGet]
		public ActionResult <IEnumerable<ProfileData>> Get()
		{
			return Ok("profiles");
		}

		[HttpPost]
		public ActionResult Post([FromBody] ProfileData profileData)
		{
			if(profileData == null)
			{
				return BadRequest("Invalid Data");
			}

			profileData.Id = profiles.Count + 1;

			profiles.Add(profileData);
			return CreatedAtAction(nameof(Get), new { id = profileData.Id }, profileData);
		}

		//[HttpPut]
		//public IActionResult Put([FromBody] ProfileData profileData)
		//{
		//	return Ok("ProfileData coming from Backend");
		//}

		//[HttpDelete]
		//public IActionResult Delete([FromBody] ProfileData profileData)
		//{
		//	return Ok("ProfileData coming from Backend");
		//}
	}
}
