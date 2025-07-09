from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional

def get_user(db: Session, user_id: int) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.idUser == user_id).first()

def get_user_by_username(db: Session, username: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.username == username).first()

def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[models.User]:
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    db_user = models.User(username=user.username, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_posts(db: Session, skip: int = 0, limit: int = 100, user_id: Optional[int] = None) -> List[models.Post]:
    query = db.query(models.Post)
    if user_id:
        query = query.filter(models.Post.user_id == user_id)
    return query.offset(skip).limit(limit).all()

def get_post(db: Session, post_id: int) -> Optional[models.Post]:
    return db.query(models.Post).filter(models.Post.idPost == post_id).first()

def create_post(db: Session, post: schemas.PostCreate) -> models.Post:
    db_post = models.Post(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post
