using EcommercePlatform.Server.Data;
using EcommercePlatform.Server.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ECommerceDataBaseSetting>(
	builder.Configuration.GetSection("EcommercePlatformDatabase"));

builder.Services.AddSingleton<MongoDbDatabase>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Add CORS policy
app.UseCors(config =>
{
	config
	.AllowAnyOrigin()
	.AllowAnyMethod()
	.AllowAnyHeader();
});

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
