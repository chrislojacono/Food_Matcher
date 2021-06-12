using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodMatcherApp.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace FoodMatcherApp.Data_Access
{
    public class MessageRepository
    {
        const string ConnectionString = "Server=localhost;Database=FoodMatcher;Trusted_Connection=True;";

        public List<Message> GetSessionMessages(Guid sessionId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        FROM Messages
                        WHERE SessionId = @SessionId";

            return db.Query<Message>(sql, new { SessionId = sessionId }).OrderByDescending(message => message.CreatedDate).ToList();
        }

        public void AddMessage(Message message)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[Messages]([MessageDesc],[UserId],[SessionId])
                        VALUES(@MessageDesc,@UserId,@SessionId)";

            db.Execute(sql, message);
        }
    }
}
