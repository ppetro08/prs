namespace Prs_Api.Models.Configuration
{
    public class AppSettings
    {
        public ApiSettings? Apis { get; set; }
        public JwtSettings? Jwt { get; set; }
    }

    public class JwtSettings
    {
        public string Key { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
    }

    public class ApiSettings {
        public ApiSetting? Sonarr { get; set; }
        public ApiSetting? Radarr { get; set; }
    }

    public class ApiSetting
    {
        public string Url { get; set; } = string.Empty;
        public string Key { get; set; } = string.Empty;
    }
}
