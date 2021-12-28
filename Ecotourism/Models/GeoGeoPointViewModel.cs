using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Ecotourism.Models
{
    public class GeoGeoPointViewModel
    {
        [Key]
        public int Id { get; set; }

        public float Lon { get; set; }

        public float Lat { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImagePath { get; set; }
    }
}