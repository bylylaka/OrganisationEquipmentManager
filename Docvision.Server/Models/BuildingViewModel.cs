namespace Docvision.Server.WebApi.Models
{
	using System.Collections.Generic;

	public class BuildingViewModel
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public List<RoomViewModel> Rooms { get; set; }
	}
}
