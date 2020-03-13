namespace Docvision.Server.WebApi
{
	using Docvision.Server.Infrastructure;
	using Microsoft.AspNetCore;
	using Microsoft.AspNetCore.Hosting;
	using Microsoft.Extensions.DependencyInjection;

	public class Program
	{
		public static void Main(string[] args)
		{
			var host = BuildWebHost(args);

			using (var scope = host.Services.CreateScope())
			{
				var service = scope.ServiceProvider;
					var context = service.GetRequiredService<ApplicationContext>();
					context.Database.EnsureCreated();
			}
			host.Run();
		}

		public static IWebHost BuildWebHost(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>()
				.Build();
	}
}
