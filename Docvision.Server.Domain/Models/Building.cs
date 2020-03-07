namespace Docvision.Server.Domain.Models
{
	using System.Collections.Generic;

	public class Building
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public List<Room> Rooms { get; set; }
	}
}
