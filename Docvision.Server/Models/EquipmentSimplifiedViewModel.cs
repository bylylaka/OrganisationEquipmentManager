using System.ComponentModel.DataAnnotations;

namespace Docvision.Server.WebApi.Models
{
	public class EquipmentSimplifiedViewModel
	{
		[StringLength(100, MinimumLength = 1)]
		public string Name { get; set; }

		[Range(1, 10000)]
		public int Count { get; set; }
	}
}
