/*
* File Name: TravelerModels.cs
* Description: Models related to the Traveler entity and related request/response models.
* Author: IT20123468
*/

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Reservation_System.Models
{
    // Traveler entity model mapped to MongoDB
    [BsonIgnoreExtraElements]
    public class Traveler
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; } = string.Empty;

        [BsonElement("nic")]
        public string Nic { get; set; } = "Traveler NIC";

        [BsonElement("email")]
        public string Email { get; set; } = "Traveler Email";

        [BsonElement("password")]
        public string Password { get; set; } = "Traveler Password";

        [BsonElement("accountstatus")]
        public string AccountStatus { get; set; } = "Active";

        [BsonElement("firstname")]
        public string FirstName { get; set; } = "Traveler First Name";

        [BsonElement("lastname")]
        public string LastName { get; set; } = "Traveler Last Name";

        [BsonElement("phonenumber")]
        public string PhoneNumber { get; set; } = "Traveler Phone Number";

    }

    // Model for handling login requests
    public class LoginRequest
    {
        public string Nic { get; set; }
        public string Password { get; set; }
    }

    // Model for handling password change requests
    public class ChangePasswordRequest
    {

        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }

}
