﻿namespace Docvision.Server.WebApi
{
	using Microsoft.AspNetCore.Builder;
	using Microsoft.AspNetCore.Hosting;
	using Microsoft.Extensions.Configuration;
	using Microsoft.Extensions.DependencyInjection;
	using Docvision.Server.Infrastructure;
	using Microsoft.EntityFrameworkCore;
	using Docvision.Server.Domain.Services;
	using Docvision.Server.Infrastructure.Repositories;
	using AutoMapper;

	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddAutoMapper(typeof(Startup));
			services.AddMvc();
			services.AddCors();

			var connection = Configuration.GetConnectionString("DefaultConnection");
			services.AddDbContext<ApplicationContext>(options =>
				options.UseSqlServer(connection));

			services.AddScoped<IOrganisationService, OrganisationService>();
			services.AddScoped<IOrganisationRepository, OrganisationRepository>();
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseCors(builder => builder.AllowAnyOrigin());
			
			app.UseMvc();
		}
	}
}