from pydantic import BaseModel, EmailStr
from datetime import datetime, date
from typing import List, Union, Literal, Optional
from uuid import UUID

class UserBase(BaseModel):
  username: str
  email: EmailStr
  password: str
  birthdate: date

class UserDisplay(BaseModel):
  username: str
  email: str
  birthdate: date
  class Config():
    orm_mode = True

class PostBase(BaseModel):
  title: str
  price: float
  image_url: str
  image_url_type: Literal['absolute','relative']
  creator_id: Union[UUID, int, str]

# For PostDisplay
class User(BaseModel):
  username: str
  class Config():
    orm_mode = True

# For PostDisplay
class Review(BaseModel):
  text: str
  username: str
  class Config():
    orm_mode = True

class PostDisplay(BaseModel):
  title: str
  price: float
  image_url: str
  image_url_type: str
  user: Optional[User]
  reviews: List[Review]
  class Config():
    orm_mode = True

class UserAuth(BaseModel):
  id: Union[UUID, int, str]
  username: str
  email: str

class ReviewBase(BaseModel):
  username: str
  text: str
  post_id: Union[UUID, int, str]