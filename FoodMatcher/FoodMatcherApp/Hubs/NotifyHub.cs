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
        public async Task AddMessage(Message message)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[Messages]([MessageDesc],[UserId],[SessionId])
                        VALUES(@MessageDesc,@UserId,@SessionId)";

            db.Execute(sql, message);

            #pragma warning disable
            Task.Factory.StartNew(() => DoTasks(message.SessionId));

            //Like a callback
           await Clients.All.SendAsync("AddedMessage", message);
        }

        public async Task TaskDone(Message message)
        {
            await Clients.All.SendAsync("TaskIsDone", message);
        }

        private void DoTasks(Guid sessionId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select * from Messages where sessionId = @SessionId";

            var messages = db.Query<Message>(sql, new { SessionId = sessionId });

            messages.ToList().ForEach(x =>
            {
                Thread.Sleep(1000);
                HubHelper.Notifier.NotifyDone(x);
            });
        }

    }
}
