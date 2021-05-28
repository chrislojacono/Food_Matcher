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

        public void AddARestaurant(Restaurant restaurant)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[Restaurants]([Id],[Name],[Address],[Rating],[Image_Url],[YelpUrl],[Distance])
                        VALUES(@Id,@Name,@Address,@Rating,@Image_Url,@YelpUrl,@Distance)";

            db.Execute(sql, restaurant);

        }
    }
}
