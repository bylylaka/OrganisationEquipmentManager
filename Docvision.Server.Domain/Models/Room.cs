namespace Docvision.Server.Domain.Models
{
	using System.Collections.Generic;

	public class Room
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public int BuildingId { get; set; }

		public List<Equipment> Equipments { get; set; }
	}
}
