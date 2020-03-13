namespace Docvision.Server.WebApi
{
	using AutoMapper;
	using Docvision.Server.Domain.Models;
	using Docvision.Server.WebApi.Models;
	using System.Linq;

	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<Building, BuildingSimplifiedViewModel>()
				.ForMember(bs => bs.Rooms,
				opt => opt.MapFrom(b => b.Rooms));

			CreateMap<Room, RoomSimplifiedViewModel>()
				.ForMember(rs => rs.EquipmentCount,
				opt => opt.MapFrom(r => r.Equipment.Sum(e => e.Count)));

			CreateMap<EquipmentSimplifiedViewModel, Equipment>()
				.ReverseMap();
		}
	}
}
