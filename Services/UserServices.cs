
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Reservation_System.Data;
using Reservation_System.Models;

namespace Reservation_System.Services
{
    public class UserServices
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserServices(IOptions<DatabaseSettings> settings) 
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _userCollection = mongoDb.GetCollection<User>(settings.Value.CollectionName);
        }

        //services for the users

        //get all users
        public async Task<List<User>> GetAsync() => await _userCollection.Find(_ => true).ToListAsync();

        //get user by id 
        public async Task<User> GetAsync(string id) => 
            await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // Get user by NIC
        public async Task<User> GetByNICAsync(string nic) =>
            await _userCollection.Find(x => x.Nic == nic).FirstOrDefaultAsync();

        //add new user
        public async Task CreateAsync(User newUser) =>
            await _userCollection.InsertOneAsync(newUser);

        //update user
        public async Task UpdateAsync(String id, User updateUser) =>
            await _userCollection.ReplaceOneAsync(x => x.Id == id, updateUser);

        //delete user
        public async Task RemoveAsync(String id) =>
            await _userCollection.DeleteOneAsync(x => x.Id == id);

    }

}
