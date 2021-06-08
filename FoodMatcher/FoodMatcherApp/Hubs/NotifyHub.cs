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

namespace FoodMatcherApp.Hubs
{
    public class NotifyHub : Hub
    {

        private static ConcurrentBag<TaskItem> _tasks = new ConcurrentBag<TaskItem>();

        //Going to be called from the client side
        public async Task AddTask(object taskItem)
        {
            TaskItem item = JsonConvert.DeserializeObject<TaskItem>(((JsonElement)taskItem).ToString());

            _tasks.Add(item);
            //Like a callback
           await Clients.All.SendAsync("AddedTask", taskItem);
        }

        private void DoTasks()
        {
            _tasks.ToList().ForEach(x =>
            {
                Thread.Sleep(1000 * RandomNumber(1, 10));
                HubHelper.Notifier.NotifyDone(x);
            });
        }

        public int RandomNumber(int min, int max)
        {
            Random random = new Random();

            return random.Next(min, max);
        }
    }
}
