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

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.SessionId.ToString());

            await Clients.Group(userConnection.SessionId.ToString()).SendAsync("RecieveMessage", userConnection.UserName, $"{userConnection.UserName} has entered the chat");

        }
    }
}
