// // // // Middleware/WebSocketMiddleware.cs - NEW FILE
// // // using System.Net.WebSockets;
// // // using System.Text;
// // // using HRInterview.API.Controllers;

// // // namespace HRInterview.API.Middleware
// // // {
// // //     public class WebSocketMiddleware
// // //     {
// // //         private readonly RequestDelegate _next;

// // //         public WebSocketMiddleware(RequestDelegate next)
// // //         {
// // //             _next = next;
// // //         }

// // //         public async Task InvokeAsync(HttpContext context)
// // //         {
// // //             if (context.Request.Path == "/ws/signaling")
// // //             {
// // //                 if (context.WebSockets.IsWebSocketRequest)
// // //                 {
// // //                     var interviewId = context.Request.Query["interviewId"].ToString();
// // //                     var role = context.Request.Query["role"].ToString();

// // //                     if (string.IsNullOrEmpty(interviewId) || string.IsNullOrEmpty(role))
// // //                     {
// // //                         context.Response.StatusCode = 400;
// // //                         return;
// // //                     }

// // //                     using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
// // //                     var connectionId = $"{interviewId}_{role}_{Guid.NewGuid()}";
                    
// // //                     SignalingHub.AddConnection(connectionId, webSocket);
// // //                     Console.WriteLine($"[WebSocket] {role} connected to interview {interviewId}");

// // //                     try
// // //                     {
// // //                         await HandleWebSocketAsync(webSocket, interviewId, connectionId);
// // //                     }
// // //                     finally
// // //                     {
// // //                         SignalingHub.RemoveConnection(connectionId);
// // //                         Console.WriteLine($"[WebSocket] {role} disconnected from interview {interviewId}");
// // //                     }
// // //                 }
// // //                 else
// // //                 {
// // //                     context.Response.StatusCode = 400;
// // //                 }
// // //             }
// // //             else
// // //             {
// // //                 await _next(context);
// // //             }
// // //         }

// // //         private async Task HandleWebSocketAsync(WebSocket webSocket, string interviewId, string connectionId)
// // //         {
// // //             var buffer = new byte[1024 * 4];

// // //             while (webSocket.State == WebSocketState.Open)
// // //             {
// // //                 try
// // //                 {
// // //                     var result = await webSocket.ReceiveAsync(
// // //                         new ArraySegment<byte>(buffer),
// // //                         CancellationToken.None
// // //                     );

// // //                     if (result.MessageType == WebSocketMessageType.Text)
// // //                     {
// // //                         var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
// // //                         Console.WriteLine($"[WebSocket] Received from {connectionId}: {message.Substring(0, Math.Min(100, message.Length))}...");

// // //                         // Broadcast to other participants
// // //                         await SignalingHub.BroadcastToInterview(
// // //                             int.Parse(interviewId.Split('_')[0]), 
// // //                             connectionId, 
// // //                             message
// // //                         );
// // //                     }
// // //                     else if (result.MessageType == WebSocketMessageType.Close)
// // //                     {
// // //                         await webSocket.CloseAsync(
// // //                             WebSocketCloseStatus.NormalClosure,
// // //                             "Closed by client",
// // //                             CancellationToken.None
// // //                         );
// // //                     }
// // //                 }
// // //                 catch (WebSocketException ex)
// // //                 {
// // //                     Console.WriteLine($"[WebSocket] Error: {ex.Message}");
// // //                     break;
// // //                 }
// // //             }
// // //         }
// // //     }
// // // }

// // // Middleware/WebSocketMiddleware.cs
// // using System.Net.WebSockets;
// // using System.Text;
// // using HRInterview.API.Controllers;

// // namespace HRInterview.API.Middleware
// // {
// //     public class WebSocketMiddleware
// //     {
// //         private readonly RequestDelegate _next;

// //         public WebSocketMiddleware(RequestDelegate next)
// //         {
// //             _next = next;
// //         }

// //         public async Task InvokeAsync(HttpContext context)
// //         {
// //             // Check if this is a WebSocket signaling request
// //             if (context.Request.Path == "/ws/signaling")
// //             {
// //                 if (context.WebSockets.IsWebSocketRequest)
// //                 {
// //                     // Get query parameters
// //                     var interviewId = context.Request.Query["interviewId"].ToString();
// //                     var role = context.Request.Query["role"].ToString();

// //                     Console.WriteLine($"[WebSocketMiddleware] 📞 Incoming WebSocket request");
// //                     Console.WriteLine($"[WebSocketMiddleware]    Interview ID: {interviewId}");
// //                     Console.WriteLine($"[WebSocketMiddleware]    Role: {role}");

// //                     // Validate parameters
// //                     if (string.IsNullOrEmpty(interviewId) || string.IsNullOrEmpty(role))
// //                     {
// //                         Console.WriteLine($"[WebSocketMiddleware] ❌ Invalid parameters");
// //                         context.Response.StatusCode = 400;
// //                         await context.Response.WriteAsync("Missing interviewId or role parameter");
// //                         return;
// //                     }

// //                     // Accept WebSocket connection
// //                     using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
// //                     var connectionId = $"{interviewId}_{role}_{Guid.NewGuid()}";
                    
// //                     Console.WriteLine($"[WebSocketMiddleware] ✅ WebSocket accepted: {connectionId}");
                    
// //                     // Add to SignalingHub
// //                     SignalingHub.AddConnection(connectionId, webSocket);

// //                     try
// //                     {
// //                         // Handle WebSocket messages
// //                         await HandleWebSocketAsync(webSocket, interviewId, role, connectionId);
// //                     }
// //                     catch (Exception ex)
// //                     {
// //                         Console.WriteLine($"[WebSocketMiddleware] ❌ Error handling WebSocket: {ex.Message}");
// //                         Console.WriteLine($"[WebSocketMiddleware]    Stack trace: {ex.StackTrace}");
// //                     }
// //                     finally
// //                     {
// //                         // Clean up
// //                         SignalingHub.RemoveConnection(connectionId);
// //                         Console.WriteLine($"[WebSocketMiddleware] 🔌 WebSocket disconnected: {connectionId}");
// //                     }
// //                 }
// //                 else
// //                 {
// //                     // Not a WebSocket request
// //                     Console.WriteLine($"[WebSocketMiddleware] ❌ Not a WebSocket request");
// //                     context.Response.StatusCode = 400;
// //                     await context.Response.WriteAsync("Expected WebSocket request");
// //                 }
// //             }
// //             else
// //             {
// //                 // Pass to next middleware
// //                 await _next(context);
// //             }
// //         }

// //         private async Task HandleWebSocketAsync(WebSocket webSocket, string interviewId, string role, string connectionId)
// //         {
// //             var buffer = new byte[1024 * 4]; // 4KB buffer

// //             Console.WriteLine($"[WebSocketMiddleware] 👂 Listening for messages from {connectionId}");

// //             while (webSocket.State == WebSocketState.Open)
// //             {
// //                 try
// //                 {
// //                     // Receive message
// //                     var result = await webSocket.ReceiveAsync(
// //                         new ArraySegment<byte>(buffer),
// //                         CancellationToken.None
// //                     );

// //                     if (result.MessageType == WebSocketMessageType.Text)
// //                     {
// //                         // Decode message
// //                         var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                        
// //                         // Log received message (truncate for readability)
// //                         var preview = message.Length > 100 
// //                             ? message.Substring(0, 100) + "..." 
// //                             : message;
// //                         Console.WriteLine($"[WebSocketMiddleware] 📨 Received from {role} ({connectionId}): {preview}");

// //                         // Broadcast to other participants in the same interview
// //                         if (int.TryParse(interviewId, out int parsedInterviewId))
// //                         {
// //                             await SignalingHub.BroadcastToInterview(
// //                                 parsedInterviewId,
// //                                 connectionId,
// //                                 message
// //                             );
// //                         }
// //                         else
// //                         {
// //                             Console.WriteLine($"[WebSocketMiddleware] ⚠️  Invalid interview ID: {interviewId}");
// //                         }
// //                     }
// //                     else if (result.MessageType == WebSocketMessageType.Close)
// //                     {
// //                         Console.WriteLine($"[WebSocketMiddleware] 👋 Close message received from {connectionId}");
                        
// //                         await webSocket.CloseAsync(
// //                             WebSocketCloseStatus.NormalClosure,
// //                             "Closed by client",
// //                             CancellationToken.None
// //                         );
// //                         break;
// //                     }
// //                 }
// //                 catch (WebSocketException ex)
// //                 {
// //                     Console.WriteLine($"[WebSocketMiddleware] ❌ WebSocket error: {ex.Message}");
// //                     break;
// //                 }
// //                 catch (Exception ex)
// //                 {
// //                     Console.WriteLine($"[WebSocketMiddleware] ❌ Unexpected error: {ex.Message}");
// //                     Console.WriteLine($"[WebSocketMiddleware]    Stack trace: {ex.StackTrace}");
// //                     break;
// //                 }
// //             }

// //             Console.WriteLine($"[WebSocketMiddleware] 🛑 WebSocket loop ended for {connectionId}. State: {webSocket.State}");
// //         }
// //     }
// // }

// // Middleware/WebSocketMiddleware.cs - COMPLETE VERIFIED VERSION
// using System.Net.WebSockets;
// using System.Text;
// using HRInterview.API.Controllers;

// namespace HRInterview.API.Middleware
// {
//     public class WebSocketMiddleware
//     {
//         private readonly RequestDelegate _next;

//         public WebSocketMiddleware(RequestDelegate next)
//         {
//             _next = next;
//         }

//         public async Task InvokeAsync(HttpContext context)
//         {
//             if (context.Request.Path == "/ws/signaling")
//             {
//                 if (context.WebSockets.IsWebSocketRequest)
//                 {
//                     var interviewId = context.Request.Query["interviewId"].ToString();
//                     var role = context.Request.Query["role"].ToString();

//                     Console.WriteLine($"[WebSocket] 📞 Connection request: Interview={interviewId}, Role={role}");

//                     if (string.IsNullOrEmpty(interviewId) || string.IsNullOrEmpty(role))
//                     {
//                         context.Response.StatusCode = 400;
//                         await context.Response.WriteAsync("Missing parameters");
//                         return;
//                     }

//                     using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
//                     var connectionId = $"{interviewId}_{role}_{Guid.NewGuid().ToString().Substring(0, 8)}";
                    
//                     SignalingHub.AddConnection(connectionId, webSocket);

//                     try
//                     {
//                         await HandleWebSocketAsync(webSocket, interviewId, connectionId);
//                     }
//                     finally
//                     {
//                         SignalingHub.RemoveConnection(connectionId);
//                     }
//                 }
//                 else
//                 {
//                     context.Response.StatusCode = 400;
//                 }
//             }
//             else
//             {
//                 await _next(context);
//             }
//         }

//         private async Task HandleWebSocketAsync(WebSocket webSocket, string interviewId, string connectionId)
//         {
//             var buffer = new byte[1024 * 8]; // 8KB buffer

//             Console.WriteLine($"[WebSocket] 👂 Listening: {connectionId}");

//             while (webSocket.State == WebSocketState.Open)
//             {
//                 try
//                 {
//                     var result = await webSocket.ReceiveAsync(
//                         new ArraySegment<byte>(buffer),
//                         CancellationToken.None
//                     );

//                     if (result.MessageType == WebSocketMessageType.Text)
//                     {
//                         var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                        
//                         // Extract message type for logging
//                         var msgType = "unknown";
//                         try
//                         {
//                             var jsonDoc = System.Text.Json.JsonDocument.Parse(message);
//                             if (jsonDoc.RootElement.TryGetProperty("type", out var typeElement))
//                             {
//                                 msgType = typeElement.GetString() ?? "unknown";
//                             }
//                         }
//                         catch { }

//                         Console.WriteLine($"[WebSocket] 📨 Received '{msgType}' from {connectionId}");

//                         // Broadcast to others in same interview
//                         if (int.TryParse(interviewId, out int parsedId))
//                         {
//                             await SignalingHub.BroadcastToInterview(parsedId, connectionId, message);
//                         }
//                     }
//                     else if (result.MessageType == WebSocketMessageType.Close)
//                     {
//                         Console.WriteLine($"[WebSocket] 👋 Close received from {connectionId}");
//                         await webSocket.CloseAsync(
//                             WebSocketCloseStatus.NormalClosure,
//                             "Closed by client",
//                             CancellationToken.None
//                         );
//                         break;
//                     }
//                 }
//                 catch (WebSocketException ex)
//                 {
//                     Console.WriteLine($"[WebSocket] ❌ WebSocket error: {ex.Message}");
//                     break;
//                 }
//             }

//             Console.WriteLine($"[WebSocket] 🔌 Disconnected: {connectionId}");
//         }
//     }
// }


//new
// Middleware/WebSocketMiddleware.cs - UPDATED WITH FILE SHARE SUPPORT
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using HRInterview.API.Controllers;

namespace HRInterview.API.Middleware
{
    public class WebSocketMiddleware
    {
        private readonly RequestDelegate _next;

        public WebSocketMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path == "/ws/signaling")
            {
                if (context.WebSockets.IsWebSocketRequest)
                {
                    var interviewId = context.Request.Query["interviewId"].ToString();
                    var role = context.Request.Query["role"].ToString();

                    Console.WriteLine($"[WebSocket] 📞 Connection request: Interview={interviewId}, Role={role}");

                    if (string.IsNullOrEmpty(interviewId) || string.IsNullOrEmpty(role))
                    {
                        context.Response.StatusCode = 400;
                        await context.Response.WriteAsync("Missing parameters");
                        return;
                    }

                    using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
                    var connectionId = $"{interviewId}_{role}_{Guid.NewGuid().ToString().Substring(0, 8)}";
                    
                    SignalingHub.AddConnection(connectionId, webSocket);

                    try
                    {
                        await HandleWebSocketAsync(webSocket, interviewId, connectionId);
                    }
                    finally
                    {
                        SignalingHub.RemoveConnection(connectionId);
                    }
                }
                else
                {
                    context.Response.StatusCode = 400;
                }
            }
            else
            {
                await _next(context);
            }
        }

        private async Task HandleWebSocketAsync(WebSocket webSocket, string interviewId, string connectionId)
        {
            // Increased buffer size for large file transfers (base64 encoded files)
            var buffer = new byte[1024 * 64]; // 64KB buffer for file transfers

            Console.WriteLine($"[WebSocket] 👂 Listening: {connectionId}");

            while (webSocket.State == WebSocketState.Open)
            {
                try
                {
                    using var ms = new MemoryStream();
                    WebSocketReceiveResult result;
                    
                    // Handle potentially large messages (files) in chunks
                    do
                    {
                        result = await webSocket.ReceiveAsync(
                            new ArraySegment<byte>(buffer),
                            CancellationToken.None
                        );
                        
                        ms.Write(buffer, 0, result.Count);
                    } while (!result.EndOfMessage);

                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        var message = Encoding.UTF8.GetString(ms.ToArray());
                        
                        // Extract message type for logging
                        var msgType = "unknown";
                        var isFileShare = false;
                        try
                        {
                            var jsonDoc = JsonDocument.Parse(message);
                            if (jsonDoc.RootElement.TryGetProperty("type", out var typeElement))
                            {
                                msgType = typeElement.GetString() ?? "unknown";
                                isFileShare = msgType == "file-share";
                            }
                        }
                        catch { }

                        if (isFileShare)
                        {
                            Console.WriteLine($"[WebSocket] 📎 File share from {connectionId}");
                        }
                        else
                        {
                            Console.WriteLine($"[WebSocket] 📨 Received '{msgType}' from {connectionId}");
                        }

                        // Broadcast to others in same interview
                        if (int.TryParse(interviewId, out int parsedId))
                        {
                            await SignalingHub.BroadcastToInterview(parsedId, connectionId, message);
                        }
                    }
                    else if (result.MessageType == WebSocketMessageType.Close)
                    {
                        Console.WriteLine($"[WebSocket] 👋 Close received from {connectionId}");
                        await webSocket.CloseAsync(
                            WebSocketCloseStatus.NormalClosure,
                            "Closed by client",
                            CancellationToken.None
                        );
                        break;
                    }
                }
                catch (WebSocketException ex)
                {
                    Console.WriteLine($"[WebSocket] ❌ WebSocket error: {ex.Message}");
                    break;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[WebSocket] ❌ Error: {ex.Message}");
                    break;
                }
            }

            Console.WriteLine($"[WebSocket] 🔌 Disconnected: {connectionId}");
        }
    }
}