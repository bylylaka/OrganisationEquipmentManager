﻿namespace Docvision.Server.WebApi.Controllers
{
	using AutoMapper;
	using Docvision.Server.Domain.Exceptions;
	using Docvision.Server.Domain.Models;
	using Docvision.Server.Domain.Services;
	using Docvision.Server.WebApi.Models;
	using Microsoft.AspNetCore.Mvc;
	using System.Collections.Generic;
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
		public async Task<IActionResult> AllEquipmentNames()
		{
			var equipment = await _organisationService.GetAllEquipment();

			var equipmentInfo = equipment
				.GroupBy(e => e.Name)
				.Select(e => new EquipmentSimplifiedViewModel()
				{
					Name = e.Key,
					Count = e.Sum(x => x.Count)
				})
				.ToList();

			return Ok(equipmentInfo);
		}

		[Route("{buildingId}/{roomId?}")]
		[HttpGet]
		public async Task<IActionResult> LocalEquipment(
			[FromRoute] int buildingId,
			[FromRoute] int? roomId)
		{
			List<EquipmentSimplifiedViewModel> simplifiedEquipment;

			if (roomId.HasValue)
			{
				var equipment = await _organisationService.GetRoomEquipment(roomId.Value);
				simplifiedEquipment = equipment
					.Select(e => _mapper.Map<EquipmentSimplifiedViewModel>(e))
					.ToList();
			}
			else
			{
				var equipment = await _organisationService.GetBuildingEquipment(buildingId);
				simplifiedEquipment = equipment
					.GroupBy(e => e.Name)
					.Select(e => new EquipmentSimplifiedViewModel()
					{
						Name = e.Key,
						Count = e.Sum(x => x.Count)
					})
					.ToList();
			}

			return Ok(simplifiedEquipment);
		}

		[Route("{roomId}")]
		[HttpPost]
		public async Task<IActionResult> Equipment(
			[FromRoute] int roomId,
			[FromBody] EquipmentSimplifiedViewModel model)
		{
			if (!ModelState.IsValid)
			{
				throw new BadRequestException();
			}

			var equipment = _mapper.Map<Equipment>(model);
			equipment.RoomId = roomId;

			var newEquipment = await _organisationService.AddEquipment(equipment);
			var newEquipmentCountInfo = _mapper.Map<EquipmentSimplifiedViewModel>(model);
			return Ok(newEquipmentCountInfo);
		}
	}
}
