using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using FoodMatcherApp.Models;

namespace FoodMatcherApp.Data_Access
{
    public class FinalDecisionRepository
    {
        const string ConnectionString = "Server=localhost;Database=FoodMatcher;Trusted_Connection=True;";

        public void AddAFinalDecision(FinalDecision final)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"IF EXISTS (SELECT * FROM Final_Decisions WHERE SessionId = @SessionId)
                        BEGIN
                        UPDATE [dbo].[Final_Decisions]
                        SET [RestaurantId] = @RestaurantId
                        WHERE SessionId = @SessionId
                        END
                        ELSE
                        BEGIN
                        INSERT INTO [dbo].[Final_Decisions]([SessionId],[RestaurantId])
                        VALUES(@SessionId,@RestaurantId)
                        END;";

            var id = db.Execute(sql, new
            {
                RestaurantId = final.RestaurantId,
                SessionId = final.SessionId,
            });
        }

        public Restaurant GetFinalDecision(Guid sessionId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT R.* 
                       FROM Final_Decisions FD
                            JOIN Restaurants R
	                        ON R.Id = FD.RestaurantId
	                        WHERE FD.SessionId = @SessionId";

            return db.QueryFirstOrDefault<Restaurant>(sql, new { SessionId = sessionId });

        }

    }
}
