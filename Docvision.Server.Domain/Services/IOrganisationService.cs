using Docvision.Server.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Docvision.Server.Domain.Services
{
	public interface IOrganisationService
	{
		Task<List<Building>> GetOrganisationStructure();

		Task<List<Equipment>> GetAllEquipments();
	}
}
