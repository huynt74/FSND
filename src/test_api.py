import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy
from main import app
from models import setup_db, Actor, Movie
from settings import DATABASE_URL, TOKEN_TEST_PR, TOKEN_TEST_DR

class UnitTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        # self.database_name = DB_NAME_TEST
        self.database_path = DATABASE_URL
        
        self.app = app

        self.client = self.app.test_client
        
        # setup_db(self.app, self.database_path)

         # binds the app to the current context
        # with self.app.app_context():
        #     self.db = SQLAlchemy()
        #     self.db.init_app(self.app)
        #     # create all tables
        #     self.db.create_all()

    
    def tearDown(self):
        """Executed after reach test"""
        print("Finish")
    
    def test_health(self):
        response = self.client().get('/')
        assert response.status_code == 200
        assert response.json == 'Healthy'
        
    def test_get_actors(self):
        response = self.client().get('/actors')
        assert response.status_code == 200
        assert response.json['success'] == True
        
    def test_get_movies(self):
        response = self.client().get('/movies')
        assert response.status_code == 200
        assert response.json['success'] == True
        
    def test_create_actor_no_auth(self):
        response = self.client().post('/actors', json = {'name': 'huy', 'age': 24, 'gender': 'male' })
        assert response.status_code == 401
        assert response.json['code'] == 'authorization_header_missing'
        
    def test_no_match_route(self):
        response = self.client().get('/movies2')
        assert response.status_code == 404
    # role producer    
    def test_create_actor_with_auth(self):

        mimetype = 'application/json'
        headers = {
        'Content-Type': mimetype,
        'Accept': mimetype,
        'Authorization': TOKEN_TEST_PR
        }
        response = self.client().post('/actors', 
            json = {'name': 'huy', 'age': 24, 'gender': 'male' },
            headers =headers
            )
        
        assert response.status_code == 200
        assert response.json['success'] == True
        assert response.json['actor_name'] == 'huy'
        
    def test_update_role_producer(self):
        mimetype = 'application/json'
        headers = {
        'Content-Type': mimetype,
        'Accept': mimetype,
        'Authorization': TOKEN_TEST_PR
        }
        response = self.client().patch('/actors/1', 
            json = {'name': 'nam', 'age': 24, 'gender': 'male' },
            headers =headers
            )
        
        assert response.status_code == 403
        assert response.json['code'] == 'unauthorized'

    #role director
    def test_update_actor(self):
        mimetype = 'application/json'
        headers = {
        'Content-Type': mimetype,
        'Accept': mimetype,
        'Authorization': TOKEN_TEST_DR
        }
        response = self.client().patch('/actors/1', 
            json = {'name': 'Hung', 'age': 24, 'gender': 'male' },
            headers =headers
            )
        
        assert response.status_code == 200
        assert response.json['success'] == True
        assert response.json['id_up'] == 1
        
    def test_create_movie(self):
        mimetype = 'application/json'
        headers = {
        'Content-Type': mimetype,
        'Accept': mimetype,
        'Authorization': TOKEN_TEST_DR
        }
        response = self.client().post('/movies', 
            json = {'title': 'bo gia', 'content': 'no content', 'release': '2024-04-04' },
            headers =headers
            )
        
        assert response.status_code == 200
        assert response.json['success'] == True

if __name__ == '__main__': 
    unittest.main()
