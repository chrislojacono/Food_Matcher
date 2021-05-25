using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using FoodMatcherApp.Models;

namespace FoodMatcherApp.Data_Access
{
    public class SessionRepository
    {
        const string ConnectionString = "Server=localhost;Database=FoodMatcher;Trusted_Connection=True;";

        public List<Session> GetAllSessions()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = "Select * From Sessions";

            return db.Query<Session>(sql).ToList();
        }

        public void AddASession(Session session)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[Sessions]([Location],[Category],[SearchTerm],[CreatedDate])
                        OUTPUT inserted.Id
                        VALUES(@Location,@Category,@SearchTerm,@CreatedDate)";

            var id = db.ExecuteScalar<Guid>(sql, session);

            session.Id = id;


        }
    }
}
