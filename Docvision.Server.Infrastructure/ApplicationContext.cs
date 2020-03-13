namespace Docvision.Server.Infrastructure
{
	using Docvision.Server.Domain.Models;
	using Microsoft.EntityFrameworkCore;

	public class ApplicationContext : DbContext
	{
		public DbSet<Building> Buildings { get; set; }

		public DbSet<Room> Rooms { get; set; }

		public DbSet<Equipment> Equipment { get; set; }

		public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
		{
			Database.EnsureCreated();
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			ConfigureBuildings(modelBuilder);
			ConfigureRooms(modelBuilder);
			ConfigureEquipment(modelBuilder);

			Initialize(modelBuilder);
		}

		private void ConfigureBuildings(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Building>()
				.Property(b => b.Id)
				.ValueGeneratedOnAdd();
		}

		private void ConfigureRooms(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Room>()
				.Property(r => r.Id)
				.ValueGeneratedOnAdd();

			modelBuilder.Entity<Room>()
				.HasOne<Building>()
				.WithMany(b => b.Rooms)
				.HasForeignKey(r => r.BuildingId)
				.OnDelete(DeleteBehavior.Cascade);
		}

		private void ConfigureEquipment(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Equipment>()
				.Property(e => e.Id)
				.ValueGeneratedOnAdd();

			modelBuilder.Entity<Equipment>()
				.Property(e => e.Count);

			modelBuilder.Entity<Equipment>()
				.HasOne<Room>()
				.WithMany(b => b.Equipment)
				.HasForeignKey(r => r.RoomId)
				.OnDelete(DeleteBehavior.Cascade);
		}

		private void Initialize(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Building>().HasData(
				new Building[]
				{
					new Building { Id = 1, Name="Build1"},
					new Building { Id = 2, Name="Build2"},
					new Building { Id = 3, Name="Build3"},
				});

			modelBuilder.Entity<Room>().HasData(
				new Room[]
				{
					new Room { Id = 1, Name="Room1", BuildingId = 1},
					new Room { Id = 2, Name="Room2", BuildingId = 1},
					new Room { Id = 3, Name="Room3", BuildingId = 1},
					new Room { Id = 4, Name="Room4", BuildingId = 2},
					new Room { Id = 5, Name="Room5", BuildingId = 2},
					new Room { Id = 6, Name="Room6", BuildingId = 2},
					new Room { Id = 7, Name="Room7", BuildingId = 2},
					new Room { Id = 8, Name="Room8", BuildingId = 2},
				});

			modelBuilder.Entity<Equipment>().HasData(
				new Equipment[]
				{
					new Equipment { Id = 1, Name="Equipment1", RoomId = 1, Count = 101},
					new Equipment { Id = 2, Name="Equipment2", RoomId = 1, Count = 21},
					new Equipment { Id = 3, Name="Equipment3", RoomId = 1, Count = 171},
					new Equipment { Id = 4, Name="Equipment4", RoomId = 2, Count = 12},
					new Equipment { Id = 5, Name="Equipment5", RoomId = 2, Count = 611},
					new Equipment { Id = 6, Name="Equipment6", RoomId = 3, Count = 15},
					new Equipment { Id = 7, Name="Equipment7", RoomId = 4, Count = 151},
					new Equipment { Id = 8, Name="Equipment8", RoomId = 5, Count = 611},
					new Equipment { Id = 9, Name="Equipment9", RoomId = 5, Count = 211},
					new Equipment { Id = 10, Name="Equipment10", RoomId = 5, Count = 511},
					new Equipment { Id = 11, Name="Equipment9", RoomId = 1, Count = 1},
					new Equipment { Id = 12, Name="Equipment8", RoomId = 2, Count = 611},
					new Equipment { Id = 13, Name="Equipment7", RoomId = 3, Count = 52},
					new Equipment { Id = 14, Name="Equipment6", RoomId = 4, Count = 22},
					new Equipment { Id = 15, Name="Equipment5", RoomId = 8, Count = 789},
					new Equipment { Id = 16, Name="Equipment4", RoomId = 8, Count = 125},
					new Equipment { Id = 17, Name="Equipment3", RoomId = 8, Count = 112},
					new Equipment { Id = 18, Name="Equipment2", RoomId = 8, Count = 11},
				});
		}
	}
}
