using System.Drawing.Printing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
    [Route("formcontrol")]
    [ApiController]
    public class FormController : ControllerBase
    {
        [HttpPost]
        public void Post ([FromBody] string value)
        {
            Console.Write(value);
        }
    }
}
