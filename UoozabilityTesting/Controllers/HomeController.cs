using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using UoozabilityTesting.Models;

namespace UoozabilityTesting.Controllers
{
    public class HomeController : Controller
    {
        private UoozabilityTestingContext db = new UoozabilityTestingContext();

        List<string> questions = new List<string> { "Click where you would tap to write a new story", 
                                                    "Click where you tap if you were looking for settings", 
                                                    "What do you think the 'f' button does?",
                                                    "" };


        List<string> images = new List<string>  { "01", 
                                                  "01", 
                                                  "04",
                                                  "END" };


        public ActionResult Results()
        {
            ViewBag.Message = "Results";
            questions.RemoveAt(questions.Count - 1);
            images.RemoveAt(images.Count - 1);
            ViewData["questions"] = questions;
            ViewData["images"] = images;


            var results = db.Database.SqlQuery<ResultFeedback>("GetResults").ToList();


            return View(results);
        }

        public ActionResult Index()
        {
            ViewData["firstquestion"] = questions[0];
            ViewData["firstimage"] = images[0];
            User newuser = new User { email = "", };
            db.Users.Add(newuser);
            db.SaveChanges();
            string newuserid = newuser.id.ToString();
            ViewData["userid"] = newuserid;
           return View();
        }

        [HttpPost]
        public ActionResult RecordFeedback(Feedback feedback)
        {
            int index = feedback.question_id;
            int nextindex = index + 1;
            new Thread(() =>
            {
                if (ModelState.IsValid)
                {
                    db.Feedbacks.Add(feedback);
                    db.SaveChanges();
                }
            }).Start();

            return Json(new { question = questions[nextindex], image = images[nextindex] });
        }

        [HttpPost]
        public ActionResult RegisterEmail(User user)
        {
            int uid = user.id;
            string email = user.email;
            new Thread(() =>
            {
                if (ModelState.IsValid)
                {
                    db.Entry(user).State = EntityState.Modified;
                    db.SaveChanges();
                }
            }).Start();

            return Json(new { question = questions[0], image = images[0] });
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}