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

        public string AddAUser(User user)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"IF EXISTS (SELECT * FROM Users WHERE EmailAddress = @EmailAddress)
                        BEGIN
                        UPDATE [dbo].[Users]
                        SET [Id] = @Id,[FirstName] = @FirstName,[LastName] = @LastName,[EmailAddress] = @EmailAddress, [Image_Url] = @Image_Url
                        WHERE EmailAddress = @EmailAddress
                        SELECT Id from Users where EmailAddress = @EmailAddress
                        END
                        ELSE
                        BEGIN
	                    INSERT INTO [dbo].[Users]([Id],[FirstName],[LastName],[EmailAddress],[Image_Url])
                        OUTPUT inserted.Id
                        VALUES(@Id,@FirstName,@LastName,@EmailAddress,@Image_Url)
                        END;";

           var id = db.ExecuteScalar<string>(sql, new { Id = user.Id, EmailAddress = user.EmailAddress, FirstName = user.FirstName, LastName = user.LastName, Image_Url = user.Image_Url });

           user.Id = id;

           return id;

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
