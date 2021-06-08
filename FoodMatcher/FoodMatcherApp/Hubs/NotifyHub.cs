using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace FoodMatcherApp.Hubs
{
    public class NotifyHub : Hub
    {
        //Going to be called from the client side
        public async Task AddTask(object taskItem)
        {
            //Like a callback
           await Clients.All.SendAsync("AddedTask", taskItem);
        }
    }
}
