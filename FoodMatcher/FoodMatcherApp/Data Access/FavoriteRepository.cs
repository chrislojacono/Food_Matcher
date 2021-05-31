using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using FoodMatcherApp.Models;

namespace FoodMatcherApp.Data_Access
{
    public class FavoriteRepository
    {
        const string ConnectionString = "Server=localhost;Database=FoodMatcher;Trusted_Connection=True;";

        public List<Favorite> GetAllUsersFavorites(string userId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select * 
                        From Favorites
                        Where UserId = @UserId";

            return db.Query<Favorite>(sql, new { UserId = userId }).ToList();
        }

    }
}
