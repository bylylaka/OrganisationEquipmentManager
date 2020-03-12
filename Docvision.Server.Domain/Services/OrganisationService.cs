namespace Docvision.Server.Domain.Services
{
	using Docvision.Server.Domain.Exceptions;
	using Docvision.Server.Domain.Models;
	using System.Collections.Generic;
	using System.Threading.Tasks;

	public class OrganisationService : IOrganisationService
	{
		private readonly IOrganisationRepository _organisationRepository;

		public OrganisationService(
			IOrganisationRepository organisationRepository)
		{
			_organisationRepository = organisationRepository;
		}

		public async Task<List<Building>> GetOrganisationStructure()
		{
			return await _organisationRepository.FindOrganisationStructure();
		}

		public async Task<List<Equipment>> GetAllEquipment()
		{
			return await _organisationRepository.FindAllEquipment();
		}

		public async Task<Building> GetBuildingById(int id)
		{
			return await _organisationRepository.FindBuildingById(id);
		}

		public async Task<Room> GetRoomById(int id)
		{
			return await _organisationRepository.FindRoomById(id);
		}

		public async Task<Equipment> GetEquipmentByNameAndRoom(string name, int roomId, bool tracking = false)
		{
			return await _organisationRepository.FindEquipmentByNameAndRoom(name, roomId, tracking);
		}

		public async Task<List<Equipment>> GetBuildingEquipment(int buildingId)
		{
			var building = await GetBuildingById(buildingId);
			if (building == null)
			{
				throw new BadRequestException();
			}
			return await _organisationRepository.FindBuildingEquipment(buildingId);
		}

		public async Task<List<Equipment>> GetRoomEquipment(int roomId)
		{
			var room = await GetRoomById(roomId);
			if (room == null)
			{
				throw new BadRequestException();
			}
			return await _organisationRepository.FindRoomEquipment(roomId);
		}

		public async Task<Equipment> AddEquipment(Equipment equipment)
		{
			var room = await GetRoomById(equipment.RoomId);
			if (room == null)
			{
				throw new BadRequestException();
			}

			var existedEquipment = await GetEquipmentByNameAndRoom(equipment.Name, equipment.RoomId);
			if (existedEquipment != null)
			{
				throw new BadRequestException();
			}
			return await _organisationRepository.AddEquipment(equipment);
		}

		public async Task<Equipment> UpdateEquipment(Equipment equipment)
		{
			var room = await GetRoomById(equipment.RoomId);
			if (room == null)
			{
				throw new BadRequestException();
			}

			var existedEquipment = await GetEquipmentByNameAndRoom(equipment.Name, equipment.RoomId, true);
			if (existedEquipment == null)
			{
				throw new BadRequestException();
			}

			existedEquipment.Count = equipment.Count;
			await _organisationRepository.SaveChangesAsync();

			return existedEquipment;
		}

		public async Task RemoveEquipment(Equipment equipment)
		{
			var room = await GetRoomById(equipment.RoomId);
			if (room == null)
			{
				throw new BadRequestException();
			}

			var existedEquipment = await GetEquipmentByNameAndRoom(equipment.Name, equipment.RoomId);
			if (existedEquipment == null)
			{
				throw new BadRequestException();
			}
			await _organisationRepository.RemoveEquipment(existedEquipment);
		}
	}
}
