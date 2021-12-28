using Ecotourism.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Ecotourism.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly Entities _dbContext = new Entities();

        //public HomeController(Entities dbContext)
        //{
        //    _dbContext = dbContext;
        //}

        public ActionResult Index()
        {
            return View(_dbContext.GeoPoints.ToList());
        }
        public ActionResult AddPoint()
        {
            return View();
        }
        public ActionResult ViewPoints()
        {
            return View(_dbContext.GeoPoints.ToList());
        }
        public ActionResult ViewPoint()
        {
            return View(_dbContext.GeoPoints.ToList());
        }
        public ActionResult Map()
        {
            return View();
        }
        public ActionResult Center()
        {
            return View();
        }
        public ActionResult Dalny()
        {
            return View();
        }
        public ActionResult Kavkaz()
        {
            return View();
        }
        public ActionResult Point()
        {
            return View();
        }
        public ActionResult PointNorthKavkaz()
        {
            return View();
        }
        public ActionResult PointSibir()
        {
            return View();
        }
        public ActionResult PointUral()
        {
            return View();
        }
        public ActionResult Privolzh()
        {
            return View();
        }
        public ActionResult Rating()
        {
            return View();
        }
        public ActionResult Sibir()
        {
            return View();
        }
        public ActionResult Ural()
        {
            return View();
        }
        public ActionResult Ug()
        {
            return View();
        }
        public ActionResult Zapad()
        {
            return View();
        }
    }
}
