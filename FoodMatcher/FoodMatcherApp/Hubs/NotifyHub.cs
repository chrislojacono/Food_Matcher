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
    public class NotifyHub : Hub
    {

        const string ConnectionString = "Server=localhost;Database=FoodMatcher;Trusted_Connection=True;";

        //Going to be called from the client side
        public async Task AddTask(TaskItem taskItem)
        {
       

            _tasks.Add(taskItem);

            #pragma warning disable
            Task.Factory.StartNew(DoTasks);

            //Like a callback
           await Clients.All.SendAsync("AddedTask", taskItem);
        }

        public async Task TaskDone(object taskItem)
        {
            await Clients.All.SendAsync("TaskIsDone", taskItem);
        }

        private void DoTasks()
        {
            _tasks.ToList().ForEach(x =>
            {
                Thread.Sleep(1000);
                HubHelper.Notifier.NotifyDone(x);
            });
        }

    }
}
