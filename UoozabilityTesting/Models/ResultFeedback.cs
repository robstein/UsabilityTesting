using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UoozabilityTesting.Models
{
    public class ResultFeedback
    {
        public int question_id { get; set; }
        public string comments { get; set; }
        public int xcoord { get; set; }
        public int ycoord { get; set; }
        public string email { get; set; }
    }

}