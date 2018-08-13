using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace Pawliner.Common
{
    public class LogRequestAndResponseHandler : DelegatingHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var requestBody = await request.Content.ReadAsStringAsync();
            if (!string.IsNullOrEmpty(requestBody))
            {
                using (var fstream = new StreamWriter(HttpContext.Current.Server.MapPath("~/Logs/logs.json"), true, Encoding.Default))
                {
                    await fstream.WriteLineAsync("Request: " + requestBody);
                }
            }

            var result = await base.SendAsync(request, cancellationToken);
            if (result.Content != null)
            {
                var responseBody = await result.Content.ReadAsStringAsync();
                using (var fstream = new StreamWriter(HttpContext.Current.Server.MapPath("~/Logs/logs.json"), true, Encoding.Default))
                {
                    await fstream.WriteLineAsync("Response: " + responseBody);
                }
            }

            return result;
        }
    }
}
