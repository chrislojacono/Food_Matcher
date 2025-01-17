﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using FoodMatcherApp.Models;

namespace FoodMatcherApp.Data_Access
{
    public class SessionRepository
    {
        const string ConnectionString = "Server=localhost;Database=FoodMatcher;Trusted_Connection=True;";

        public List<Session> GetAllSessions()
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = "Select * From Sessions";

            return db.Query<Session>(sql).ToList();
        }

        public Guid AddASession(Session session)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"INSERT INTO [dbo].[Sessions]([Location],[SearchTerm], [User1Id])
                        OUTPUT inserted.Id
                        VALUES(@Location,@SearchTerm, @User1Id)";

            var id = db.ExecuteScalar<Guid>(sql, session);

            session.Id = id;

            return id;
        }

        public Session GetASessionById(Guid sessionId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select * 
                        From Sessions
                        Where Id = @Id";
            return db.QueryFirstOrDefault<Session>(sql, new { Id = sessionId });
        }

        public void CompleteSession(Guid sessionId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Update Sessions
                        Set Completed = 1
                        Where Id = @Id";

            db.Execute(sql, new { Id = sessionId });
        }

        public void SetUser2Id(Guid sessionId, string userId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Update Sessions
                        Set User2Id = @UserId
                        Where Id = @Id";

            db.Execute(sql, new { Id = sessionId, UserId = userId });
        }

        public List<Session> GetASessionByUserId(string userId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Select * 
                        From Sessions
                        Where User1Id = @User1Id or User2Id = @User2Id";

            return db.Query<Session>(sql, new { User1Id = userId, User2Id = userId }).OrderByDescending(session => session.CreatedDate).ToList();
        }

        public void DeleteSession(Guid sessionId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"Delete From Final_Decisions Where SessionId = @SessionId;
                        Delete From Session_Likes Where SessionId = @SessionId;
                        Delete From Messages Where SessionId = @SessionId;
                        Delete From Sessions Where Id = @SessionId;";

            db.Execute(sql, new { SessionId = sessionId });
        }
    }
}
