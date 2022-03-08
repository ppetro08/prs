using System.ComponentModel.DataAnnotations;

namespace prs_api.Models.Authentication
{
    public class ConfirmRegistrationRequestModel
    {
        [Required]
        public string UserId { get; set; } = string.Empty;
        [Required]

        public string Token { get; set; } = string.Empty;
    }

    public class ConfirmRegistrationResponseModel
    {
        [Required]
        public string UserId { get; set; } = string.Empty;
        [Required]

        public string Token { get; set; } = string.Empty;
    }
}
