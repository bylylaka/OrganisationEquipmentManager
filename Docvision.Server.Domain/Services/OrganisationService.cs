using System.Collections.Generic;
using System.Threading.Tasks;
using Docvision.Server.Domain.Models;

namespace Docvision.Server.Domain.Services
{
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
	}
}
