/*
* File Name: TravelerServices.cs
* Description: Services for performing CRUD and related operations for travelers.
* Author: IT20123468
*/

using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Reservation_System.Data;
using Reservation_System.Models;
using BC = BCrypt.Net.BCrypt;

namespace Reservation_System.Services
{
    public class TravelerServices
    {
        private readonly IMongoCollection<Traveler> _travelerCollection;

        // Constructor for initializing the MongoDB connection and collection
        public TravelerServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _travelerCollection = mongoDb.GetCollection<Traveler>(settings.Value.TravelerCollectionName);
        }

        /* Services for the travelers */

        // Fetch all travelers from the database
        public async Task<List<Traveler>> GetAsync() => await _travelerCollection.Find(_ => true).ToListAsync();

        // Fetch a single traveler from the database using their NIC
        public async Task<Traveler> GetAsync(string nic) =>
            await _travelerCollection.Find(x => x.Nic == nic).FirstOrDefaultAsync();

        // Insert a new traveler into the database
        public async Task CreateAsync(Traveler newTraveler) =>
            await _travelerCollection.InsertOneAsync(newTraveler);

        // Update the details of a traveler in the database using their NIC
        public async Task UpdateAsync(string nic, Traveler updateTraveler)
        {
            if (string.IsNullOrWhiteSpace(updateTraveler.Id))
            {
                throw new ArgumentException("The Traveler Id is missing or invalid.");
            }

            await _travelerCollection.ReplaceOneAsync(x => x.Nic == nic, updateTraveler);
        }

        // Delete a traveler from the database using their NIC
        public async Task RemoveAsync(string nic) =>
            await _travelerCollection.DeleteOneAsync(x => x.Nic == nic);

        // Verify the entered password against the one stored in the database for a given NIC
        public async Task<bool> VerifyPassword(string nic, string enteredPassword)
        {
            var traveler = await GetAsync(nic);
            if (traveler == null)
                return false;

            return BC.Verify(enteredPassword, traveler.Password);
        }

        // Authenticate a traveler for login by verifying their NIC and password      
        public async Task<Traveler> AuthenticateAsync(string nic, string password)
        {
            bool isAuthenticated = await VerifyPassword(nic, password);
            if (!isAuthenticated)
                return null;

            return await GetAsync(nic);
        }

        // Change the password of a traveler in the database
        public async Task<bool> ChangePassword(string nic, string currentPassword, string newPassword)
        {
            var traveler = await GetAsync(nic);
            if (traveler == null)
                return false;

            bool isVerified = BC.Verify(currentPassword, traveler.Password);
            if (!isVerified)
                return false;

            var hashedNewPassword = BC.HashPassword(newPassword);


            Console.WriteLine($"NIC: {nic}");
            Console.WriteLine($"Hashed current password in DB: {traveler.Password}");
            Console.WriteLine($"Hashed new password: {hashedNewPassword}");

            var filter = Builders<Traveler>.Filter.Eq(t => t.Nic, nic);
            var update = Builders<Traveler>.Update.Set(t => t.Password, hashedNewPassword);

            var updateResult = await _travelerCollection.UpdateOneAsync(filter, update);

            Console.WriteLine($"Matched Count: {updateResult.MatchedCount}");
            Console.WriteLine($"Modified Count: {updateResult.ModifiedCount}");


            return updateResult.ModifiedCount > 0;

        }

        // Deactivate a traveler's account in the database
        public async Task<bool> ChangeAccountStatus(string nic)
        {
            var status = "Deactivated";
            var traveler = await GetAsync(nic);
            if (traveler == null)
                return false;

            traveler.AccountStatus = status;
            await UpdateAsync(nic, traveler);
            return true;
        }


    }
}
