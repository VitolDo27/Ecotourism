using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Ecotourism.Models
{
    public class GeoGeoPoints
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Ширина")]
        public float Lon { get; set; }

        [Display(Name = "Долгота")]
        public float Lat { get; set; }

        [Display(Name = "Название")]
        public string Name { get; set; }

        [Display(Name = "Описание")]
        public string Description { get; set; }

        [Display(Name = "Название файла картинки")]
        public string ImagePath { get; set; }
    }
}