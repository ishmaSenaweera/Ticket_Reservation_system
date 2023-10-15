using Microsoft.AspNetCore.Mvc;
using Reservation_System.Models;
using Reservation_System.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Reservation_System.Controllers
{
    [Route("api/train")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        private readonly TrainServices _trainServices;

        public TrainController(TrainServices trainServices)
        {
            _trainServices = trainServices;
        }

        // GET: api/train
        [HttpGet]
        public async Task<ActionResult<List<Train>>> Get() => await _trainServices.GetAsync();


        // GET api/train/5
        // id contain 24 characters string
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Train>> Get(string id)
        {
            Train train = await _trainServices.GetAsync(id);
            if (train == null)
            {
                return NotFound();
            }

            return train;
        }

        // POST api/train
        [HttpPost]
        public async Task<ActionResult<Train>> Post(Train newTrain)
        {
            await _trainServices.CreateAsync(newTrain);
            return CreatedAtAction(nameof(Get), new { id = newTrain.Id }, newTrain);

        }

        // PUT api/train/5
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, Train updateTrain)
        {
            Train train = await _trainServices.GetAsync(id);
            if (train == null)
            {
                return NotFound("There is no train with this id: " + id);
            }

            updateTrain.Id = train.Id;

            await _trainServices.UpdateAsync(id, updateTrain);

            return Ok("Updated Successfully");

        }

        // DELETE api/train/5
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            Train train = await _trainServices.GetAsync(id);
            if (train == null)
            {
                return NotFound("There is no train with this id: " + id);
            }

            await _trainServices.RemoveAsync(id);

            return Ok("Deleted Successfully");

        }
    }
}
