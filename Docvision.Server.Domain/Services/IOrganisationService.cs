using Docvision.Server.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Docvision.Server.Domain.Services
{
	public interface IOrganisationService
	{
		Task<List<Building>> GetOrganisationStructure();

		Task<List<Equipment>> GetAllEquipments();

		Task<Room> GetRoomById(int id);

		Task<Equipment> GetEquipmentByNameAndRoom(string name, int roomId);

		Task AddEquipment(Equipment equipment);
	}
}
