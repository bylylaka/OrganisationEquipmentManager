using Docvision.Server.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Docvision.Server.Domain.Services
{
	public interface IOrganisationRepository
	{
		Task<List<Building>> FindOrganisationStructure();

		Task<List<Equipment>> FindAllEquipments();

		Task<Equipment> AddEquipment(Equipment equipment);

		Task<Equipment> FindEquipmentByNameAndRoom(string name, int roomId);

		Task<Room> FindRoomById(int id);
	}
}
