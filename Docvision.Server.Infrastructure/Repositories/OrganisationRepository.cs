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

		public async Task<List<Equipment>> FindAllEquipments()
		{
			return await _dbContext.Equipment.ToListAsync();
		}

		public async Task<List<Building>> FindOrganisationStructure()
		{
			return await _dbContext.Buildings
				.Include(b => b.Rooms)
				.ThenInclude(r => r.Equipments)
				.ToListAsync();
		}

		public async Task AddEquipment(Equipment equipment)
		{
			await _dbContext.AddAsync(equipment);
			await _dbContext.SaveChangesAsync();
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
	}
}
