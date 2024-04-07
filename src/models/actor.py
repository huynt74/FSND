from models import db, Actor_Movie
from sqlalchemy import Column, String, Integer, Identity, Table
import json

class Actor(db.Model):
    __tablename__ = 'Actor'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)
    gender = Column(String)
    movies = db.relationship('Movie', secondary = Actor_Movie, backref = 'Actor', lazy = True, overlaps="Actor, movies")
    
    def __init__(self, name, age, gender):
        self.name = name
        self.age = age
        self.gender = gender
        
    def insert(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit() 
        
    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'gender': self.gender,
            'movies': [mv.id for mv in self.movies]
        }
    
    def __repr__(self):
        return {
            'id': self.id
        }
