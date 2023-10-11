/*
* File Name: ReservationModels.cs
* Description: Model to define Reservation attributes
* Author: IT20168704
*/

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Reservation_system.Models
{
    // Reservation entity model mapped to MongoDB
    [BsonIgnoreExtraElements]
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; } = string.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = "Traveller Name";

        [BsonElement("mobile")]
        public string Mobile { get; set; } = "Mobile Number";

        [BsonElement("email")]
        public string Email { get; set; } = "Traveller Email";

        [BsonElement("date")]
        public string Date { get; set; } = "Booking Date";

        [BsonElement("details")]
        public string Details { get; set; } = "Booking Details";

        [BsonElement("tickets")]
        public string Tickets { get; set; } = "Ticket Number";


    }
}
