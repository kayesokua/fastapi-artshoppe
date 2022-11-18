from sqlalchemy.sql.schema import ForeignKey
from .database import Base
from sqlalchemy import Column, String, DateTime, Date, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy_utils import UUIDType
from sqlalchemy.dialects.postgresql import UUID
import uuid

class DbUser(Base):
  __tablename__ = 'user'
  id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
  username = Column(String, unique=True, index=True)
  email = Column(String, unique=True, index=True)
  password = Column(String)
  birthdate = Column(Date)
  timestamp = Column(DateTime, default=datetime.now())
  items = relationship('DbPost', back_populates='user')

class DbPost(Base):
  __tablename__ = 'post'
  id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
  image_url = Column(String)
  image_url_type = Column(String)
  title = Column(String, index=True)
  price = Column(Float, index=True)
  timestamp = Column(DateTime, default=datetime.now())
  user_id = Column(UUID(as_uuid=True), ForeignKey('user.id'))
  user = relationship('DbUser', back_populates='items')
  reviews = relationship('DbReview', back_populates='post')

class DbReview(Base):
  __tablename__ = 'review'
  id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
  text = Column(String)
  username = Column(String, index=True)
  timestamp = Column(DateTime, default=datetime.now())
  post_id = Column(UUID(as_uuid=True), ForeignKey('post.id'))
  post = relationship("DbPost", back_populates="reviews")