using EcommercePlatform.Server.Data;
using EcommercePlatform.Server.Model;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EcommercePlatform.Server.Controllers
{
	[Route("api/part4/LogIn")]
	[ApiController]
	public class LogInController : ControllerBase
	{
		private readonly MongoDbDatabase _database;

		public LogInController(MongoDbDatabase database)
		{
			_database = database;
		}

		[HttpGet]
		public async Task<IActionResult> ProfileDataListForLogin()
		{
			try
			{
				var logingDataList = await _database.GetAllProfileAsync();

				if(logingDataList.Count == 0)
				{
					return NoContent();
				}

				return Ok(logingDataList);
			}
			catch (Exception)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}

		[HttpGet]
		[Route("{userName}")]
		public async Task<IActionResult> GetProfileDataByUserName(string userName)
		{
			try
			{
				var profileData = await _database.GetProfileDataByUserNameAsync(userName);

				if (profileData.UserName != userName)
				{
					return NoContent();
				}
				return Ok(profileData);
			}
			catch (Exception)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}

		[HttpPost("logIn")]
		public async Task<IActionResult> LogInAsync([FromBody] UserCredentials credentials)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			
			var hashedPassword = HashPassword(credentials.PassWord);

			var profileData = await _database.GetAuthenticationByUsernameAndPasswordAsync(credentials.UserName, hashedPassword);
			if (profileData == null)
			{
				return Unauthorized("Invalid username or password.");
			}

			return Ok("Login successful.");
		}

		private string HashPassword(string password)
		{
			return password; // Do not use this in production!
		}

		
	}
}
