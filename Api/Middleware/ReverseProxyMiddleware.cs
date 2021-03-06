using Microsoft.Extensions.Options;
using Prs_Api.Models.Configuration;

namespace Prs_Api.Middleware
{
    public class ReverseProxyMiddleware
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        private readonly RequestDelegate _nextMiddleware;
        private readonly IOptions<AppSettings> _appSettings;

        public ReverseProxyMiddleware(RequestDelegate nextMiddleware, IOptions<AppSettings> appSettings)
        {
            _nextMiddleware = nextMiddleware;
            _appSettings = appSettings;
        }

        public async Task Invoke(HttpContext context)
        {
            var targetUri = BuildTargetUri(context.Request);

            if (targetUri != null)
            {
                var targetRequestMessage = CreateTargetMessage(context, targetUri);
                using (var responseMessage = await _httpClient.SendAsync(targetRequestMessage, HttpCompletionOption.ResponseHeadersRead, context.RequestAborted))
                {
                    context.Response.StatusCode = (int)responseMessage.StatusCode;
                    CopyFromTargetResponseHeaders(context, responseMessage);
                    await responseMessage.Content.CopyToAsync(context.Response.Body);
                }
                return;
            }
            await _nextMiddleware(context);
        }

        private HttpRequestMessage CreateTargetMessage(HttpContext context, Uri targetUri)
        {
            var requestMessage = new HttpRequestMessage();
            CopyFromOriginalRequestContentAndHeaders(context, requestMessage);

            requestMessage.RequestUri = targetUri;
            requestMessage.Headers.Host = targetUri.Host;
            requestMessage.Method = GetMethod(context.Request.Method);

            return requestMessage;
        }

        private void CopyFromOriginalRequestContentAndHeaders(HttpContext context, HttpRequestMessage requestMessage)
        {
            var requestMethod = context.Request.Method;

            if (!HttpMethods.IsGet(requestMethod) &&
              !HttpMethods.IsHead(requestMethod) &&
              !HttpMethods.IsDelete(requestMethod) &&
              !HttpMethods.IsTrace(requestMethod))
            {
                var streamContent = new StreamContent(context.Request.Body);
                requestMessage.Content = streamContent;
            }

            foreach (var header in context.Request.Headers)
            {
                requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
            }

            foreach (var header in context.Request.Headers)
            {
                requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
            }
        }

        private void CopyFromTargetResponseHeaders(HttpContext context, HttpResponseMessage responseMessage)
        {
            foreach (var header in responseMessage.Headers)
            {
                context.Response.Headers[header.Key] = header.Value.ToArray();
            }

            foreach (var header in responseMessage.Content.Headers)
            {
                context.Response.Headers[header.Key] = header.Value.ToArray();
            }

            context.Response.Headers.Remove("transfer-encoding");
        }

        private static HttpMethod GetMethod(string method)
        {
            if (HttpMethods.IsDelete(method)) return HttpMethod.Delete;
            if (HttpMethods.IsGet(method)) return HttpMethod.Get;
            if (HttpMethods.IsHead(method)) return HttpMethod.Head;
            if (HttpMethods.IsOptions(method)) return HttpMethod.Options;
            if (HttpMethods.IsPost(method)) return HttpMethod.Post;
            if (HttpMethods.IsPut(method)) return HttpMethod.Put;
            if (HttpMethods.IsTrace(method)) return HttpMethod.Trace;
            return new HttpMethod(method);
        }

        private Uri? BuildTargetUri(HttpRequest request)
        {
            Uri? targetUri = null;

            if (request.Path.StartsWithSegments("/api/radarr", out var remainingPath))
            {
                var radarrSettings = _appSettings.Value.Apis?.Radarr;
                // TODO - How can I securely store these keys?
                if (radarrSettings != null)
                {
                    request.Headers.Add("X-API-Key", radarrSettings.Key);
                    targetUri = new Uri(radarrSettings.Url + remainingPath + request.QueryString);
                }
            }
            else if (request.Path.StartsWithSegments("/api/sonarr", out remainingPath))
            {
                var sonarrSettings = _appSettings.Value.Apis?.Sonarr;
                if (sonarrSettings != null)
                {
                    request.Headers.Add("X-Api-Key", sonarrSettings.Key);
                    targetUri = new Uri(sonarrSettings.Url + remainingPath + request.QueryString);
                }
            }

            return targetUri;
        }
    }
}
