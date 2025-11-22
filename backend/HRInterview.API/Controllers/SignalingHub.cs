// // Controllers/SignalingHub.cs - NEW FILE
// using System.Collections.Concurrent;
// using System.Net.WebSockets;
// using System.Text;

// namespace HRInterview.API.Controllers
// {
//     /// <summary>
//     /// Manages WebSocket connections and message broadcasting for WebRTC signaling
//     /// </summary>
//     public static class SignalingHub
//     {
//         // Store all active WebSocket connections
//         // Key format: "{interviewId}_{role}_{guid}"
//         private static readonly ConcurrentDictionary<string, WebSocket> _connections = new();
        
//         // Track which interviews are currently active
//         private static readonly ConcurrentDictionary<int, HashSet<string>> _interviewConnections = new();

//         /// <summary>
//         /// Add a new WebSocket connection
//         /// </summary>
//         public static void AddConnection(string connectionId, WebSocket socket)
//         {
//             _connections[connectionId] = socket;
            
//             // Extract interview ID from connection ID (format: interviewId_role_guid)
//             var parts = connectionId.Split('_');
//             if (parts.Length >= 1 && int.TryParse(parts[0], out int interviewId))
//             {
//                 if (!_interviewConnections.ContainsKey(interviewId))
//                 {
//                     _interviewConnections[interviewId] = new HashSet<string>();
//                 }
//                 _interviewConnections[interviewId].Add(connectionId);
//             }

//             Console.WriteLine($"[SignalingHub] ✅ Connection added: {connectionId}");
//             Console.WriteLine($"[SignalingHub] 📊 Total connections: {_connections.Count}");
//             LogInterviewStats();
//         }

//         /// <summary>
//         /// Remove a WebSocket connection
//         /// </summary>
//         public static void RemoveConnection(string connectionId)
//         {
//             _connections.TryRemove(connectionId, out _);
            
//             // Remove from interview tracking
//             var parts = connectionId.Split('_');
//             if (parts.Length >= 1 && int.TryParse(parts[0], out int interviewId))
//             {
//                 if (_interviewConnections.ContainsKey(interviewId))
//                 {
//                     _interviewConnections[interviewId].Remove(connectionId);
                    
//                     // Clean up empty interview entries
//                     if (_interviewConnections[interviewId].Count == 0)
//                     {
//                         _interviewConnections.TryRemove(interviewId, out _);
//                     }
//                 }
//             }

//             Console.WriteLine($"[SignalingHub] ❌ Connection removed: {connectionId}");
//             Console.WriteLine($"[SignalingHub] 📊 Total connections: {_connections.Count}");
//             LogInterviewStats();
//         }

//         /// <summary>
//         /// Broadcast a message to all other participants in the same interview
//         /// </summary>
//         public static async Task BroadcastToInterview(int interviewId, string senderConnectionId, string message)
//         {
//             // Find all connections for this interview except the sender
//             var recipients = _connections
//                 .Where(kvp => kvp.Key.StartsWith($"{interviewId}_") && kvp.Key != senderConnectionId)
//                 .ToList();

//             if (recipients.Count == 0)
//             {
//                 Console.WriteLine($"[SignalingHub] ⚠️  No recipients found for interview {interviewId}");
//                 return;
//             }

//             Console.WriteLine($"[SignalingHub] 📤 Broadcasting to {recipients.Count} recipient(s) in interview {interviewId}");

//             var sendTasks = new List<Task>();

//             foreach (var recipient in recipients)
//             {
//                 if (recipient.Value.State == WebSocketState.Open)
//                 {
//                     try
//                     {
//                         var bytes = Encoding.UTF8.GetBytes(message);
//                         var sendTask = recipient.Value.SendAsync(
//                             new ArraySegment<byte>(bytes),
//                             WebSocketMessageType.Text,
//                             true,
//                             CancellationToken.None
//                         );
//                         sendTasks.Add(sendTask);
                        
//                         Console.WriteLine($"[SignalingHub] ✉️  Message queued to: {recipient.Key}");
//                     }
//                     catch (Exception ex)
//                     {
//                         Console.WriteLine($"[SignalingHub] ❌ Error queueing message to {recipient.Key}: {ex.Message}");
//                     }
//                 }
//                 else
//                 {
//                     Console.WriteLine($"[SignalingHub] ⚠️  Recipient {recipient.Key} is not open (State: {recipient.Value.State})");
//                 }
//             }

//             // Wait for all messages to be sent
//             try
//             {
//                 await Task.WhenAll(sendTasks);
//                 Console.WriteLine($"[SignalingHub] ✅ All messages sent successfully");
//             }
//             catch (Exception ex)
//             {
//                 Console.WriteLine($"[SignalingHub] ❌ Error sending some messages: {ex.Message}");
//             }
//         }

//         /// <summary>
//         /// Send a message to a specific connection
//         /// </summary>
//         public static async Task SendToConnection(string connectionId, string message)
//         {
//             if (_connections.TryGetValue(connectionId, out var socket))
//             {
//                 if (socket.State == WebSocketState.Open)
//                 {
//                     try
//                     {
//                         var bytes = Encoding.UTF8.GetBytes(message);
//                         await socket.SendAsync(
//                             new ArraySegment<byte>(bytes),
//                             WebSocketMessageType.Text,
//                             true,
//                             CancellationToken.None
//                         );
//                         Console.WriteLine($"[SignalingHub] ✅ Message sent to {connectionId}");
//                     }
//                     catch (Exception ex)
//                     {
//                         Console.WriteLine($"[SignalingHub] ❌ Error sending to {connectionId}: {ex.Message}");
//                     }
//                 }
//                 else
//                 {
//                     Console.WriteLine($"[SignalingHub] ⚠️  Socket {connectionId} is not open");
//                 }
//             }
//             else
//             {
//                 Console.WriteLine($"[SignalingHub] ⚠️  Connection {connectionId} not found");
//             }
//         }

//         /// <summary>
//         /// Get all connections for a specific interview
//         /// </summary>
//         public static List<string> GetInterviewConnections(int interviewId)
//         {
//             if (_interviewConnections.TryGetValue(interviewId, out var connections))
//             {
//                 return connections.ToList();
//             }
//             return new List<string>();
//         }

//         /// <summary>
//         /// Check if an interview has any active connections
//         /// </summary>
//         public static bool HasActiveConnections(int interviewId)
//         {
//             return _interviewConnections.ContainsKey(interviewId) && 
//                    _interviewConnections[interviewId].Count > 0;
//         }

//         /// <summary>
//         /// Get the number of participants in an interview
//         /// </summary>
//         public static int GetParticipantCount(int interviewId)
//         {
//             if (_interviewConnections.TryGetValue(interviewId, out var connections))
//             {
//                 return connections.Count;
//             }
//             return 0;
//         }

//         /// <summary>
//         /// Close all connections for a specific interview
//         /// </summary>
//         public static async Task CloseInterviewConnections(int interviewId)
//         {
//             var connections = GetInterviewConnections(interviewId);
            
//             Console.WriteLine($"[SignalingHub] 🔒 Closing {connections.Count} connection(s) for interview {interviewId}");

//             foreach (var connectionId in connections)
//             {
//                 if (_connections.TryGetValue(connectionId, out var socket))
//                 {
//                     try
//                     {
//                         if (socket.State == WebSocketState.Open)
//                         {
//                             await socket.CloseAsync(
//                                 WebSocketCloseStatus.NormalClosure,
//                                 "Interview ended",
//                                 CancellationToken.None
//                             );
//                         }
//                         RemoveConnection(connectionId);
//                     }
//                     catch (Exception ex)
//                     {
//                         Console.WriteLine($"[SignalingHub] ❌ Error closing {connectionId}: {ex.Message}");
//                     }
//                 }
//             }
//         }

//         /// <summary>
//         /// Log current connection statistics
//         /// </summary>
//         private static void LogInterviewStats()
//         {
//             Console.WriteLine($"[SignalingHub] 📈 Active Interviews: {_interviewConnections.Count}");
//             foreach (var interview in _interviewConnections)
//             {
//                 Console.WriteLine($"[SignalingHub]    Interview {interview.Key}: {interview.Value.Count} participant(s)");
//             }
//         }

//         /// <summary>
//         /// Get all active connections (for debugging)
//         /// </summary>
//         public static Dictionary<string, string> GetAllConnectionStates()
//         {
//             return _connections.ToDictionary(
//                 kvp => kvp.Key,
//                 kvp => kvp.Value.State.ToString()
//             );
//         }

//         /// <summary>
//         /// Clean up closed connections
//         /// </summary>
//         public static void CleanupClosedConnections()
//         {
//             var closedConnections = _connections
//                 .Where(kvp => kvp.Value.State != WebSocketState.Open)
//                 .Select(kvp => kvp.Key)
//                 .ToList();

//             foreach (var connectionId in closedConnections)
//             {
//                 RemoveConnection(connectionId);
//                 Console.WriteLine($"[SignalingHub] 🧹 Cleaned up closed connection: {connectionId}");
//             }
//         }
//     }
// }

// Controllers/SignalingHub.cs - VERIFIED CORRECT VERSION
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;

namespace HRInterview.API.Controllers
{
    public static class SignalingHub
    {
        private static readonly ConcurrentDictionary<string, WebSocket> _connections = new();
        
        public static void AddConnection(string connectionId, WebSocket socket)
        {
            _connections[connectionId] = socket;
            Console.WriteLine($"[SignalingHub] ✅ Added: {connectionId} | Total: {_connections.Count}");
        }

        public static void RemoveConnection(string connectionId)
        {
            _connections.TryRemove(connectionId, out _);
            Console.WriteLine($"[SignalingHub] ❌ Removed: {connectionId} | Total: {_connections.Count}");
        }

        public static async Task BroadcastToInterview(int interviewId, string senderConnectionId, string message)
        {
            var recipients = _connections
                .Where(kvp => kvp.Key.StartsWith($"{interviewId}_") && kvp.Key != senderConnectionId)
                .ToList();

            Console.WriteLine($"[SignalingHub] 📤 Broadcasting to {recipients.Count} recipients (Interview {interviewId})");

            foreach (var recipient in recipients)
            {
                if (recipient.Value.State == WebSocketState.Open)
                {
                    try
                    {
                        var bytes = Encoding.UTF8.GetBytes(message);
                        await recipient.Value.SendAsync(
                            new ArraySegment<byte>(bytes),
                            WebSocketMessageType.Text,
                            true,
                            CancellationToken.None
                        );
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"[SignalingHub] ❌ Error sending to {recipient.Key}: {ex.Message}");
                    }
                }
            }
        }
    }
}