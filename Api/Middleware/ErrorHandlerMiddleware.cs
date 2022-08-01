using Prs_Api.Core.Exceptions;
using Serilog;
using System.Net;
using System.Text.Json;

namespace Prs_Api.ErrorHandling
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                var response = context.Response;
                response.ContentType = "application/json";

                switch (error)
                {                    
                    case AppException:
                        // custom application error
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        break;
                    case KeyNotFoundException:
                        // not found error
                        response.StatusCode = (int)HttpStatusCode.NotFound;
                        break;
                    default:
                        // unhandled error
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }

                Log.Error(error, "Test");
                var result = JsonSerializer.Serialize(new { message = error.Message, data = error.Data, innerException = error.InnerException, innerExceptionMessage = error.InnerException?.Message, stackTrace = error.StackTrace });
                await response.WriteAsync(result);
            }
        }
    }
}