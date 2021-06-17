using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using FoodMatcherApp.Models;

namespace FoodMatcherApp.Data_Access
{
    public class RestaurantRepository
    {
        const string ConnectionString = "Server=localhost;Database=FoodMatcher;Trusted_Connection=True;";

        public List<Restaurant> GetAllRestaurants()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = "Select * From Restaurants";

            return db.Query<Restaurant>(sql).ToList();
        }

        public Guid AddARestaurant(Restaurant restaurant)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"IF EXISTS (SELECT * FROM Restaurants WHERE YelpId = @YelpId)
                        BEGIN
                        UPDATE [dbo].[Restaurants]
                        SET [Name] = @Name,[Address] = @Address,[Rating] = @Rating, [Image_Url] = @Image_Url,[YelpUrl] = @YelpUrl,[YelpId] = @YelpId, [Distance] = @Distance
                        WHERE YelpId = @YelpId
                        SELECT Id from Restaurants where YelpId = @YelpId
                        END
                        ELSE
                        BEGIN
	                    INSERT INTO [dbo].[Restaurants]([Name],[Address],[Rating],[Image_Url],[YelpUrl],[YelpId],[Distance])
                        OUTPUT inserted.Id
                        VALUES(@Name,@Address,@Rating,@Image_Url, @YelpUrl,@YelpId,@Distance)
                        END;";

           var id = db.ExecuteScalar<Guid>(sql, new { 
               Name = restaurant.Name, 
               Address = restaurant.Address,
               Rating = restaurant.Rating,
               Image_Url = restaurant.Image_Url,
               YelpUrl = restaurant.YelpUrl,
               YelpId = restaurant.YelpId,
               Distance = restaurant.Distance,
           });

           restaurant.Id = id;

           return id;
        }

        public Restaurant GetRandomRestaurantFromSession(Guid sessionId, Guid restaurantId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"SELECT TOP 1 R.* 
                        FROM Session_Likes Sl
	                        JOIN Restaurants R
	                        ON R.Id = Sl.RestaurantId
                        WHERE sl.SessionId = @SessionId  and sl.RestaurantId != @RestaurantId
                        ORDER BY NEWID()";

            return db.QueryFirstOrDefault<Restaurant>(sql, new { SessionId = sessionId, RestaurantId = restaurantId });
        }
    }
}
