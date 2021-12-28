using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Ecotourism.Models;
using System.Web.Services.Description;

[assembly: OwinStartup(typeof(Ecotourism.Startup))]

namespace Ecotourism
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            ConfigurePoints(app);
        }
        public void ConfigurePoints(IAppBuilder app)
        {
            // Configure the db context, user manager and signin manager to use a single instance per request
            //app.CreatePerOwinContext(ApplicationDbContext.Create);
        }
    }
}
