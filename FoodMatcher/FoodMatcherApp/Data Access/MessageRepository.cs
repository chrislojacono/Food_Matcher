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

        public List<Messages> GetSessionMessages(Guid sessionId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select *
                        FROM Messages
                        WHERE SessionId = @SessionId";

            return db.Query<Messages>(sql, new { SessionId = sessionId }).OrderBy(message => message.CreatedDate).ToList();
        }

        public void AddMessage(Messages message)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[Messages]([Message],[UserName],[SessionId])
                        VALUES(@Message,@UserName,@SessionId)";

            db.Execute(sql, message);
        }

        public void ClearMessages(Guid sessionId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = "Delete From Messages Where SessionId = @SessionId";
        }
    }
}
