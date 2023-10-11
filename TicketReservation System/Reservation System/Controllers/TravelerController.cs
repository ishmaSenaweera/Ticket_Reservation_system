/*
* File Name: TravelerController.cs
* Description: Controller for managing traveler related API endpoints.
* Author: IT20123468
*/

using Microsoft.AspNetCore.Mvc;
using Reservation_System.Models;
using Reservation_System.Services;
using BC = BCrypt.Net.BCrypt;

namespace Reservation_System.Controllers
{
    [Route("api/traveler")]
    [ApiController]
    public class TravelerController : ControllerBase
    {
        private readonly TravelerServices _travelerServices;

        // Constructor for dependency injection
        public TravelerController(TravelerServices travelerServices)
        {
            _travelerServices = travelerServices;
        }

        // Fetch all travelers - GET: api/traveler
        [HttpGet]
        public async Task<ActionResult<List<Traveler>>> Get() => await _travelerServices.GetAsync();

        // Fetch traveler by NIC - GET api/traveler/1234567890
        [HttpGet("{nic:length(10)}")]
        public async Task<ActionResult<Traveler>> Get(string nic)
        {
            Traveler traveler = await _travelerServices.GetAsync(nic);
            if (traveler == null)
            {
                return NotFound();
            }
            return traveler;
        }

        // Register a new traveler - POST api/traveler
        [HttpPost]
        public async Task<ActionResult<Traveler>> Post(Traveler newTraveler)
        {
            Traveler traveler = await _travelerServices.GetAsync(newTraveler.Nic);
            if (traveler != null)
                return BadRequest("This NIC Already Exists"); // Check traveler already registered

            // Hash the password before storing
            newTraveler.Password = BC.HashPassword(newTraveler.Password);

            await _travelerServices.CreateAsync(newTraveler);
            return CreatedAtAction(nameof(Get), new { id = newTraveler.Id }, newTraveler);
        }

        // Update traveler details by NIC - PUT api/traveler/1234567890
        [HttpPut("{nic:length(10)}")]
        public async Task<ActionResult> Put(string nic, Traveler updateTraveler)
        {
            Traveler traveler = await _travelerServices.GetAsync(nic);
            if (traveler == null)
            {
                return NotFound("There is no Traveler with this NIC: " + nic);
            }

            try
            {
                await _travelerServices.UpdateAsync(nic, updateTraveler);
                return Ok("Updated Successfully");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // Delete traveler by NIC - DELETE api/traveler/1234567890
        [HttpDelete("{nic:length(10)}")]
        public async Task<ActionResult> Delete(string nic)
        {
            Traveler traveler = await _travelerServices.GetAsync(nic);
            if (traveler == null)
            {
                return NotFound("There is no Traveler with this NIC: " + nic);
            }

            await _travelerServices.RemoveAsync(nic);
            return Ok("Deleted Successfully");
        }

        // Login and authenticate traveler - POST api/traveler/login
        [HttpPost("login")]
        public async Task<ActionResult<Traveler>> Login(LoginRequest loginRequest)
        {
            var traveler = await _travelerServices.AuthenticateAsync(loginRequest.Nic, loginRequest.Password);

            if (traveler == null)
                return Unauthorized("Invalid NIC or password.");

            if (traveler.AccountStatus == "Active")
            {
                return Ok(traveler);
            }

            return NotFound("This account is deactivated.");

        }

        // Change traveler password by NIC - PUT api/traveler/change-password/1234567890
        [HttpPut("change-password/{nic:length(10)}")]
        public async Task<ActionResult> ChangePassword(string nic, ChangePasswordRequest changePasswordRequest)
        {
            bool isChanged = await _travelerServices.ChangePassword(
                nic,
                changePasswordRequest.CurrentPassword,
                changePasswordRequest.NewPassword
            );

            if (!isChanged)
                return BadRequest("Current password is incorrect or the NIC does not exist.");

            return Ok("Password changed successfully");
        }

        // Change traveler account status by NIC - PUT api/traveler/change-status/1234567890
        [HttpPut("change-status/{nic:length(10)}")]
        public async Task<ActionResult> ChangeStatus(string nic)
        {
            bool isChanged = await _travelerServices.ChangeAccountStatus(nic);

            if (!isChanged)
                return BadRequest("The NIC does not exist.");

            return Ok("Account Deactivated");
        }

    }
}
