using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using FoodMatcherApp.Models;
using FoodMatcherApp.Data_Access;

namespace FoodMatcherApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _botUser;

        private readonly IDictionary<string, UserConnection> _connections;

        MessageRepository _repo;

        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MyChat Bot";
            _connections = connections;
            _repo = new MessageRepository();
        }

        public async Task SendMessage(string message, Guid sessionId, string userName)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                var sessionObj = new Messages()
                {
                    Message = message,
                    SessionId = sessionId,
                    UserName = userName,
                };
 
                _repo.AddMessage(sessionObj);
                await Clients.Group(userConnection.SessionId.ToString())
                    .SendAsync("RecieveMessage", userConnection.UserName, message);
            }
        }
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.SessionId.ToString());

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.SessionId.ToString()).SendAsync("RecieveMessage", _botUser, $"{userConnection.UserName} has entered the chat");

        }
    }
}
