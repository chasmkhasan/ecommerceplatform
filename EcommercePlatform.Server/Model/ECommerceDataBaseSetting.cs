namespace EcommercePlatform.Server.Model
{
	public class ECommerceDataBaseSetting
	{
		public string ConnectionString { get; set; } = null!;
		public string DatabaseName { get; set; } = null!;
		public string ServiceCollectionName { get; set; } = null!;
		public string ProductCollectionName { get; set; } = null!;
		public string ProfileCollectionName { get; set; } = null!;

	}
}
