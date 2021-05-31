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

            var sql = @"IF NOT EXISTS (SELECT * FROM Session_Likes WHERE UserId = @UserId and RestaurantId = @RestaurantId and SessionId = @SessionId)
                        BEGIN
                        INSERT INTO [dbo].[Session_Likes]([UserId],[RestaurantId],[SessionId])
                        VALUES(@UserId,@RestaurantId,@SessionId)
                        END";

            db.Execute(sql, new { UserId = sessionLike.UserId, RestaurantId = sessionLike.RestaurantId, SessionId = sessionLike.SessionId });
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
    }
}
