namespace Docvision.Server.Infrastructure.Repositories
{
	using Docvision.Server.Domain.Models;
	using Docvision.Server.Domain.Services;
	using Microsoft.EntityFrameworkCore;
	using System.Collections.Generic;
	using System.Linq;
	using System.Threading.Tasks;

	public class OrganisationRepository : IOrganisationRepository
	{
		private ApplicationContext _dbContext;

		public OrganisationRepository(
			ApplicationContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<List<Building>> FindOrganisationStructure()
		{
			return await _dbContext.Buildings
				.Include(b => b.Rooms)
				.ThenInclude(r => r.Equipment)
				.ToListAsync();
		}

		public async Task<List<Equipment>> FindAllEquipment()
		{
			return await _dbContext.Equipment.ToListAsync();
		}

		public async Task<Building> FindBuildingById(int id)
		{
			return await _dbContext.Buildings.FirstOrDefaultAsync(b => b.Id == id);
		}

		public async Task<Room> FindRoomById(int id)
		{
			return await _dbContext.Rooms.FirstOrDefaultAsync(r => r.Id == id);
		}

		public async Task<Equipment> FindEquipmentByNameAndRoom(string name, int roomId)
		{
			return await _dbContext.Equipment
				.FirstOrDefaultAsync(e => e.RoomId == roomId && e.Name == name);
		}

		public async Task<List<Equipment>> FindBuildingEquipment(int buildingId)
		{
			return await _dbContext.Buildings
				.Where(b => b.Id == buildingId)
				.SelectMany(b => b.Rooms)
				.SelectMany(r => r.Equipment)
				.ToListAsync();
		}

		public async Task<List<Equipment>> FindRoomEquipment(int roomId)
		{
			return await _dbContext.Equipment.Where(e => e.RoomId == roomId).ToListAsync();
		}

		public async Task<Equipment> AddEquipment(Equipment equipment)
		{
			var newEquipment = await _dbContext.AddAsync(equipment);
			await _dbContext.SaveChangesAsync();

			return newEquipment.Entity;
		}

		public async Task RemoveEquipment(Equipment equipment)
		{
			_dbContext.Equipment.Remove(equipment);
			await _dbContext.SaveChangesAsync();
		}
	}
}
