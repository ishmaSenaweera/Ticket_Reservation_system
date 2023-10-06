
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Reservation_System.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        //use bson for map .net obj to mongodb obj
        //mongodb driver map to correct collection fields

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; } = string.Empty;

        [BsonElement("firstname")]

        public string FirstName { get; set; } = "User First Name";

        [BsonElement("lastname")]

        public string LastName { get; set; } = "User Last Name";

        [BsonElement("gender")]

        public string Gender { get; set; } = "User Gender";

        [BsonElement("email")]

        public string Email { get; set; } = "User Email";

        [BsonElement("password")]

        public string Password { get; set; } = "User Password";

        [BsonElement("nic")]

        public string Nic { get; set; } = "User NIC";

        [BsonElement("staffid")]

        public string StaffId { get; set; } = "User Staff Id";

        [BsonElement("type")]

        public string Type { get; set; } = "User Type";

        [BsonElement("phonenumber")]

        public string PhoneNumber { get; set; } = "User Phone Number";



    }
}
