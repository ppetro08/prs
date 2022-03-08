namespace prs_api.Models.Configuration
{
    public class JwtSettingsModel
    {
        public string Key { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
    }
}
