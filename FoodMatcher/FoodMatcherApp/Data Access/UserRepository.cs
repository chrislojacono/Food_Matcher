using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using FoodMatcherApp.Models;

namespace FoodMatcherApp.Data_Access
{
    public class UserRepository
    {
        const string ConnectionString = "Server=localhost;Database=FoodMatcher;Trusted_Connection=True;";

        public List<User> GetAllUsers()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = "Select * From Users";

            return db.Query<User>(sql).ToList();
        }

        public void AddAUser(User user)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[Users]([Id],[FirstName],[LastName],[EmailAddress],[Image_Url])
                        VALUES(@Id, @FirstName,@LastName,@EmailAddress,@Image_Url)";

            db.Execute(sql, user);
        }

        public User GetSingleUser(string id)
        {
            var sql = @"select *
                        from [Users]
                        where Id = @Id";

            using var db = new SqlConnection(ConnectionString);

            var user = db.QueryFirstOrDefault<User>(sql, new { Id = id });

            return user;
        }
    }
}
