namespace Docvision.Server.Domain.Services
{
	using Docvision.Server.Domain.Models;
	using System.Collections.Generic;
	using System.Threading.Tasks;

	public interface IOrganisationRepository
	{
		Task<List<Building>> FindOrganisationStructure();

		Task<List<Equipment>> FindAllEquipment();

		Task<Building> FindBuildingById(int id);

		Task<Room> FindRoomById(int id);

		Task<Equipment> FindEquipmentByNameAndRoom(string name, int roomId, bool tracking = false);

		Task<List<Equipment>> FindBuildingEquipment(int buildingId);

		Task<List<Equipment>> FindRoomEquipment(int roomId);

		Task<Equipment> AddEquipment(Equipment equipment);

		Task RemoveEquipment(Equipment equipment);

		Task SaveChangesAsync();
	}
}
