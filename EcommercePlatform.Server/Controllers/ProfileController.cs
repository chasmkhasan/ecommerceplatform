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
	}
}
