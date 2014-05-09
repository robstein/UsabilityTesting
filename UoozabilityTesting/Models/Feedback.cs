using System.ComponentModel.DataAnnotations;

namespace UoozabilityTesting.Models
{
    public class Feedback
    {
        public int id { get; set; }
        public int xcoord { get; set; }
        public int ycoord { get; set; }
        public string comments { get; set; }
        public int question_id { get; set; }
        public int user_id { get; set; }
    }
}