using Microsoft.AspNetCore.Mvc;
using Reservation_System.Models;
using Reservation_System.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Reservation_System.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserServices _userServices;

        public UserController(UserServices userServices)
        {
            _userServices = userServices;
        }



        // GET: api/user
        [HttpGet]
        public async Task<ActionResult<List<User>>> Get() => await _userServices.GetAsync();

        // GET api/user/5
        // id contain 24 characters string
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            User user = await _userServices.GetAsync(id);
            if(user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET api/user/{nic}
        [HttpGet("{nic}")]
        public async Task<ActionResult<User>> GetByNIC(string nic)
        {
            User user = await _userServices.GetByNICAsync(nic);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST api/user
        [HttpPost]
        public async Task<ActionResult<User>> Post(User newUser)
        {
            await _userServices.CreateAsync(newUser);
            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);

        }

        // PUT api/user/5
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, User updateUser)
        {
            User user = await _userServices.GetAsync(id);
            if(user == null)
            {
                return NotFound("There is no user with this is: "+ id);
            }

            updateUser.Id = user.Id;

            await _userServices.UpdateAsync(id, updateUser);

            return Ok("Updated Successfully");

        }

        // DELETE api/user/5
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            User user = await _userServices.GetAsync(id);
            if (user == null)
            {
                return NotFound("There is no user with this is: " + id);
            }

            await _userServices.RemoveAsync(id);

            return Ok("Deleted Successfully");

        }
    }
}
