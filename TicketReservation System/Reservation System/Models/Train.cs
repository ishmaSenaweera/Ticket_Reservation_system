using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Reservation_System.Models
{
    [BsonIgnoreExtraElements]
    public class Train
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = "Train Name";

        [BsonElement("schedule")]
        public string Schedule { get; set; } = "Train Schedule";

        [BsonElement("active")]
        public string Active { get; set; } = "Train Active";

        [BsonElement("published")]
        public string Published { get; set; } = "Train Published";
    }
}
