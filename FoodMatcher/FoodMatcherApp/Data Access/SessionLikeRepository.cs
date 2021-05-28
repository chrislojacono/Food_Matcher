using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using FoodMatcherApp.Models;

namespace FoodMatcherApp.Data_Access
{
    public class SessionLikeRepository
    {
        const string ConnectionString = "Server=localhost;Database=FoodMatcher;Trusted_Connection=True;";

        public void AddASessionLike(SessionLikes sessionLike)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[Session_Likes]([UserId],[RestaurantId],[SessionId])
                        VALUES(@UserId,@RestaurantId,@SessionId)";

            db.Execute(sql, sessionLike);

        }
    }
}
