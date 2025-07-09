from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    idUser: int
    class Config:
        orm_mode = True

class PostBase(BaseModel):
    title: str
    content: str
    user_id: int

class PostCreate(PostBase):
    pass

class Post(PostBase):
    idPost: int
    created_at: datetime
    updated_at: datetime
    user: Optional[User] = None

    class Config:
        orm_mode = True
