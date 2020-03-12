namespace Docvision.Server.Domain.Services
{
	using Docvision.Server.Domain.Models;
	using System.Collections.Generic;
	using System.Threading.Tasks;

	public interface IOrganisationService
	{
		Task<List<Building>> GetOrganisationStructure();

		Task<List<Equipment>> GetAllEquipment();

		Task<Building> GetBuildingById(int id);

		Task<Room> GetRoomById(int id);

		Task<Equipment> GetEquipmentByNameAndRoom(string name, int roomId);

		Task<List<Equipment>> GetBuildingEquipment(int buildingId);

		Task<List<Equipment>> GetRoomEquipment(int roomId);

		Task<Equipment> AddEquipment(Equipment equipment);
	}
}
