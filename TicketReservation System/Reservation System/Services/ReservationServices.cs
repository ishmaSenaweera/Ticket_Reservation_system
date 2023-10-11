/*
* File Name: ReservationServices.cs
* Description: Services for performing CRUD and related operations for reservations.
* Author: IT20168704
*/


using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Reservation_System.Data;
using Reservation_system.Models;

namespace Reservation_system.Services
{
    public class ReservationServices
    {
        private readonly IMongoCollection<Reservation> _reservationCollection;

        // Constructor for initializing the MongoDB connection and collection
        public ReservationServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _reservationCollection = mongoDb.GetCollection<Reservation>(settings.Value.ReservationCollectionName);
        }

        /* Services for the reservations */

        //get all reservations
        public async Task<List<Reservation>> GetAsync() => await _reservationCollection.Find(_=> true).ToListAsync();

        //get reservation by id 
        public async Task<Reservation> GetAsync(string id) =>
            await _reservationCollection.Find(x => x.Id == id).FirstOrDefaultAsync();


        //add new reservation
        public async Task CreateAsync(Reservation newReservation) =>
            await _reservationCollection.InsertOneAsync(newReservation);

        //update reservation
        public async Task UpdateAsync(String id, Reservation updateReservation) =>
            await _reservationCollection.ReplaceOneAsync(x => x.Id == id, updateReservation);

        //delete reservation
        public async Task RemoveAsync(String id) =>
            await _reservationCollection.DeleteOneAsync(x => x.Id == id);




    }
}
