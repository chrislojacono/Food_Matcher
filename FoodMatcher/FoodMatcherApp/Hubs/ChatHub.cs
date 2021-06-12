using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using FoodMatcherApp.Models;
using System.Collections.Concurrent;
using Newtonsoft.Json;
using System.Text.Json;
using System.Threading;
using Microsoft.Data.SqlClient;
using Dapper;

namespace FoodMatcherApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _botUser;

        private readonly IDictionary<string, UserConnection> _connections;

        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MyChat Bot";
            _connections = connections;
        }

        public async Task SendMessage(string message)
        {
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
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
