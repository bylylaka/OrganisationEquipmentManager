namespace Docvision.Server.Controllers.WebApi
{
	using Docvision.Server.Infrastructure;
	using Microsoft.AspNetCore.Mvc;
	using System.Collections.Generic;
	using System.Linq;
	using System.Threading.Tasks;

	[Route("api/[controller]")] // TODO: REMOVE
	public class ValuesController : Controller
	{
		private ApplicationContext _dbContext;

		public ValuesController(
			ApplicationContext dbContext)
		{
			_dbContext = dbContext;
		}

		// GET api/values
		[HttpGet]
		public async Task<IEnumerable<string>> Get()
		{
			var a = _dbContext.Buildings.ToList();
			return new string[] { "value1", "value2" };
		}

		// GET api/values/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody]string value)
		{
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
