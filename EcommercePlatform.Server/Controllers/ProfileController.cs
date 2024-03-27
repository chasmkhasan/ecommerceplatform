﻿using EcommercePlatform.Server.Data;
using EcommercePlatform.Server.Model;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;

namespace EcommercePlatform.Server.Controllers
{
	[Route("api/part2/profilesData")]
	[ApiController]
	public class ProfileController : ControllerBase
	{
		private IDatabaseAdapter _database;

		public ProfileController(IDatabaseAdapter database)
		{
			_database = database;
		}

		[HttpGet]
		public async Task<IActionResult> ProfileDataList()
		{
			try
			{
				var profileDataList = await _database.GetAllProfilesAsync();

				if (profileDataList.Count == 0)
				{
					return NoContent();
				}

				return Ok(profileDataList);
			}

			catch (Exception ex)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}

		[HttpGet]
		[Route("{profileId}")]
		public async Task<IActionResult> GetProfileDataById(string profileId)
		{
			try
			{
				var profileData = await _database.GetProfileDataById(profileId);

				if (profileData == null)
				{
					return NoContent();
				}

				return Ok(profileData);
			}

			catch (Exception ex)
			{
				return StatusCode(500, "An error occurred while fetching product data. Please try again later.");
			}
		}
	}
}
