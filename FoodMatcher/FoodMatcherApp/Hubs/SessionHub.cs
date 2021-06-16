using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using FoodMatcherApp.Models;
using FoodMatcherApp.Data_Access;


namespace FoodMatcherApp.Hubs
{
    public class SessionHub : Hub
    {
        FinalDecisionRepository _finalDecisionRepo;

        private readonly IDictionary<string, UserConnection> _connections;

        public SessionHub(IDictionary<string, UserConnection> connections)
        {
            _finalDecisionRepo = new FinalDecisionRepository();
            _connections = connections;
        }

        public async Task GetFinalDecision(Guid sessionId)
        {
            await Clients.Group(sessionId.ToString())
                .SendAsync("GetFinals");
        }
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.SessionId.ToString());

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.SessionId.ToString()).SendAsync("GetFinals");

        }
    }
}
