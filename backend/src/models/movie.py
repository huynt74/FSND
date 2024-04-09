from models import db, Actor_Movie
from sqlalchemy import Column, String, Integer, Identity, Table

class Movie(db.Model):
    __tablename__ = 'Movie'
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    release = Column(String)
    content =  Column(String)
    actors = db.relationship('Actor', secondary = Actor_Movie, backref = 'Movie', lazy = True, overlaps="Movie, actors")
    
    def __init__(self, title, release, content):
        self.title = title
        self.release = release
        self.content = content
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
            'title': self.title,
            'release': self.release,
            'actors': [mv.id for mv in self.actors],
            'content': self.content
        }

