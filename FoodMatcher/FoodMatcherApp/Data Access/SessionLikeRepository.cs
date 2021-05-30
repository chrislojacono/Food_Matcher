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

        public List<Restaurant> GetLikesOfAUserPerSession(string userId, Guid sessionId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT R.* 
                       FROM Session_Likes Sl
                            JOIN Restaurants R
	                        ON r.id = sl.RestaurantId
	                        WHERE sl.SessionId = @SessionId and sl.UserId = @UserId";

            return db.Query<Restaurant>(sql, new { SessionId = sessionId, UserId = userId }).ToList();
        }

        public List<Restaurant> GetMatches(Guid sessionId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT R.Id, R.Name, R.Address, R.Rating, R.Image_Url, R.Distance
                        FROM Session_Likes Sl
                            JOIN Restaurants R
	                            ON r.id = sl.RestaurantId
                        WHERE sl.SessionId = @SessionId
                        GROUP by R.Id, R.Name,  R.Address, R.Rating, R.Image_Url, R.Distance
                        HAVING Count(sl.RestaurantId) >= 2";
        }
    }
}
