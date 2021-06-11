using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodMatcherApp.Models;
using Microsoft.AspNetCore.SignalR.Client;

namespace HubHelper
{
    public static class Notifier
    {
        public async static void NotifyDone(Message message)
        {
            HubConnection connection;
            connection = new HubConnectionBuilder().WithUrl("https://localhost:44371/notify").Build();
            await connection.StartAsync();
            await connection.InvokeAsync("TaskDone", message);
        }
    }
}
