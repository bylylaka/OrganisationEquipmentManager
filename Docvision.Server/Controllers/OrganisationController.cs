﻿namespace Docvision.Server.WebApi.Controllers
{
	using AutoMapper;
	using Docvision.Server.Domain.Services;
	using Docvision.Server.WebApi.Models;
	using Microsoft.AspNetCore.Mvc;
	using System.Linq;
	using System.Threading.Tasks;

	[Route("api/[controller]/[action]")]
	public class OrganisationController : Controller
	{
		private readonly IOrganisationService _organisationService;

		private readonly IMapper _mapper;

		public OrganisationController(
			IOrganisationService organisationService,
			IMapper mapper)
		{
			_organisationService = organisationService;
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<IActionResult> Structure()
		{
			var organisationStructure = await _organisationService.GetOrganisationStructure();
			var organisationSimplifiedStructure = organisationStructure
				.Select(s => _mapper.Map<BuildingSimplifiedViewModel>(s))
				.ToList();

			return Ok(organisationSimplifiedStructure);
		}

		[HttpGet]
		public async Task<IActionResult> EquipmentsCountInfo()
		{
			var equipments = await _organisationService.GetAllEquipments();

			var equipmentsInfo = equipments
				.GroupBy(e => e.Name)
				.Select(e => new EquipmentsCountInfoViewModel()
				{
					Name = e.Key,
					Count = e.Sum(x => x.Count)
				})
				.ToList();

			return Ok(equipmentsInfo);
		}
	}
}
