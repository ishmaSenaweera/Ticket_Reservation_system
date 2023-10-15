/*
* File Name: ReservationController.cs
* Description: Controller for managing reservation related API endpoints.
* Author: IT20168704
*/


using Microsoft.AspNetCore.Mvc;
using Reservation_system.Models;
using Reservation_system.Services;


namespace Reservation_system.Controllers
{
    [Route("api/reservation")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationServices _reservationServices;

        // Constructor for dependency injection
        public ReservationController(ReservationServices reservationServices)
        {
            _reservationServices = reservationServices;
        }

        // GET: api/reservaion
        [HttpGet]
        public async Task<ActionResult<List<Reservation>>> Get() => await _reservationServices.GetAsync();


        // GET api/reservation/5
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Reservation>> Get(string id)
        {
            Reservation reservation = await _reservationServices.GetAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        // POST api/reservation
        [HttpPost]
        public async Task<ActionResult<Reservation>> Post(Reservation newReservation)
        {
            await _reservationServices.CreateAsync(newReservation);
            return CreatedAtAction(nameof(Get), new { id = newReservation.Id }, newReservation);

        }

        // PUT api/reservation/5
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, Reservation updateReservation)
        {
            Reservation reservaion = await _reservationServices.GetAsync(id);
            if (reservaion == null)
            {
                return NotFound("There is no reservation with this is: " + id);
            }

            updateReservation.Id = reservaion.Id;

            await _reservationServices.UpdateAsync(id, updateReservation);

            return Ok("Updated Successfully");

        }

        // DELETE api/reservation/5
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            Reservation reservation = await _reservationServices.GetAsync(id);
            if (reservation == null)
            {
                return NotFound("There is no reservation with this is: " + id);
            }

            await _reservationServices.RemoveAsync(id);

            return Ok("Deleted Successfully");
        }
    }
}
