from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    idUser = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(150), nullable=False)
    posts = relationship(
        "Post",
        back_populates="user",
        cascade="all, delete-orphan"
    )

class Post(Base):
    __tablename__ = "posts"
    idPost = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.idUser", ondelete="CASCADE"), nullable=False)
    user = relationship("User", back_populates="posts")
