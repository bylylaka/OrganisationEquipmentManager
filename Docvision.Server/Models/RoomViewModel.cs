namespace Docvision.Server.WebApi.Models
{
	using System.Collections.Generic;

	public class RoomViewModel
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public int BuildingId { get; set; }

		public List<EquipmentViewModel> Equipments { get; set; }
	}
}
