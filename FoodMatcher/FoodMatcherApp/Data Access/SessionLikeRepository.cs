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

        public bool AddASessionLike(SessionLikes sessionLike)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT CASE WHEN EXISTS (
                        SELECT *
                        FROM Session_Likes WHERE RestaurantId = @RestaurantId and SessionId = @SessionId and UserId != @UserId)
                        THEN CAST(1 AS BIT)
                        ELSE CAST(0 AS BIT) END
                        IF NOT EXISTS (SELECT * FROM Session_Likes WHERE UserId = @UserId and RestaurantId = @RestaurantId and SessionId = @SessionId)
                        BEGIN
                        INSERT INTO [dbo].[Session_Likes]([UserId],[RestaurantId],[SessionId])
                        VALUES(@UserId,@RestaurantId,@SessionId)
                        END";

           var isItAMatch = db.ExecuteScalar<bool>(sql, new { UserId = sessionLike.UserId, RestaurantId = sessionLike.RestaurantId, SessionId = sessionLike.SessionId });

           return isItAMatch;
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

            var sql = @"SELECT R.Id, R.Name, R.Address, R.Rating, R.Image_Url, R.Distance, R.YelpUrl, R.YelpId
                        FROM Session_Likes Sl
                            JOIN Restaurants R
	                            ON r.id = sl.RestaurantId
                        WHERE sl.SessionId = @SessionId
                        GROUP by R.Id, R.Name,  R.Address, R.Rating, R.Image_Url, R.Distance,  R.YelpUrl, R.YelpId
                        HAVING Count(sl.RestaurantId) >= 2";

            return db.Query<Restaurant>(sql, new { SessionId = sessionId }).ToList();
        }

        public void RemoveALike(string userId, Guid sessionId, Guid restaurantId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Delete From Session_Likes
                        Where UserId = @UserId and RestaurantId = @RestaurantId and SessionId = @SessionId";

            db.Execute(sql, new { UserId = userId, SessionId = sessionId, RestaurantId = restaurantId });
        }
    }
}
