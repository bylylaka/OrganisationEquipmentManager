using System.Collections.Generic;

namespace Docvision.Server.WebApi.Models
{
	public class BuildingSimplifiedViewModel
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public List<RoomSimplifiedViewModel> Rooms { get; set; }
	}
}
