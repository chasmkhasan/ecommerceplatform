using EcommercePlatform.Server.Data;
using EcommercePlatform.Server.Model;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EcommercePlatform.Server.Controllers
{
	public class LogInController : ControllerBase
	{
		private readonly MongoDbDatabase _database;

		public LogInController(MongoDbDatabase database)
		{
			_database = database;
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
