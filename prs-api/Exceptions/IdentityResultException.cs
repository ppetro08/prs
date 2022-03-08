using Microsoft.AspNetCore.Identity;

namespace prs_api.Exceptions
{
    public class IdentityResultException: Exception
    {
        public IdentityResultException(string message, IdentityResult identityResult): base(message) {
            Data["Errors"] = identityResult.Errors;
        }
    }
}
