// Controllers/SignalingController.cs - NEW FILE
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Text;
using System.Collections.Concurrent;

namespace HRInterview.API.Controllers
{
    [ApiController]
    [Route("ws")]
    public class SignalingController : ControllerBase
    {
        private static readonly ConcurrentDictionary<string, WebSocket> _connections = new();
        
        [HttpGet("signaling")]
        public async Task HandleSignaling(int interviewId, string role)
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                var connectionId = $"{interviewId}_{role}_{Guid.NewGuid()}";
                _connections[connectionId] = webSocket;

                Console.WriteLine($"[SignalingWebSocket] {role} connected to interview {interviewId}");

                try
                {
                    await HandleWebSocketMessages(webSocket, interviewId, role, connectionId);
                }
                finally
                {
                    _connections.TryRemove(connectionId, out _);
                    Console.WriteLine($"[SignalingWebSocket] {role} disconnected from interview {interviewId}");
                }
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }

        private async Task HandleWebSocketMessages(WebSocket webSocket, int interviewId, string role, string connectionId)
        {
            var buffer = new byte[1024 * 4];

            while (webSocket.State == WebSocketState.Open)
            {
                var result = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), 
                    CancellationToken.None
                );

                if (result.MessageType == WebSocketMessageType.Text)
                {
                    var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    Console.WriteLine($"[SignalingWebSocket] Received from {role}: {message}");

                    // Broadcast to other participant in same interview
                    await BroadcastToInterview(interviewId, connectionId, message);
                }
                else if (result.MessageType == WebSocketMessageType.Close)
                {
                    await webSocket.CloseAsync(
                        WebSocketCloseStatus.NormalClosure, 
                        "Closed by client", 
                        CancellationToken.None
                    );
                }
            }
        }

        private async Task BroadcastToInterview(int interviewId, string senderConnectionId, string message)
        {
            var tasks = _connections
                .Where(kvp => kvp.Key.StartsWith($"{interviewId}_") && kvp.Key != senderConnectionId)
                .Select(async kvp =>
                {
                    if (kvp.Value.State == WebSocketState.Open)
                    {
                        var bytes = Encoding.UTF8.GetBytes(message);
                        await kvp.Value.SendAsync(
                            new ArraySegment<byte>(bytes),
                            WebSocketMessageType.Text,
                            true,
                            CancellationToken.None
                        );
                    }
                });

            await Task.WhenAll(tasks);
        }
    }
}