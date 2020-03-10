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

		public async Task<List<Equipment>> GetAllEquipments()
		{
			return await _organisationRepository.FindAllEquipments();
		}

		public async Task<List<Building>> GetOrganisationStructure()
		{
			return await _organisationRepository.FindOrganisationStructure();
		}

		public async Task AddEquipment(Equipment equipment)
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
			await _organisationRepository.AddEquipment(equipment);
		}

		public async Task<Room> GetRoomById(int id)
		{
			return await _organisationRepository.FindRoomById(id);
		}

		public async Task<Equipment> GetEquipmentByNameAndRoom(string name, int roomId)
		{
			return await _organisationRepository.FindEquipmentByNameAndRoom(name, roomId);
		}
	}
}
