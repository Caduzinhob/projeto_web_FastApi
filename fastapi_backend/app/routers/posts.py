from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas, crud
from ..database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

router = APIRouter(
    prefix="/posts",
    tags=["posts"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Post)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    db_post = crud.create_post(db=db, post=post)
    db_post.user = db_post.user or db.query(models.User).filter(models.User.idUser == db_post.user_id).first()
    return db_post

@router.get("/", response_model=List[schemas.Post])
def read_posts(skip: int = 0, limit: int = 100, user: Optional[int] = Query(None), db: Session = Depends(get_db)):
    posts = crud.get_posts(db, skip=skip, limit=limit, user_id=user)
    for post in posts:
        post.user = post.user or db.query(models.User).filter(models.User.idUser == post.user_id).first()
    return posts

@router.get("/{post_id}", response_model=schemas.Post)
def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    db_post.user = db_post.user or db.query(models.User).filter(models.User.idUser == db_post.user_id).first()
    return db_post

@router.delete("/{post_id}", status_code=204)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(db_post)
    db.commit()
    return

@router.put("/{post_id}", response_model=schemas.Post)
def update_post(post_id: int, post: schemas.PostCreate, db: Session = Depends(get_db)):
    db_post = crud.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    db_post.title = post.title
    db_post.content = post.content
    db_post.user_id = post.user_id
    db.commit()
    db.refresh(db_post)
    db_post.user = db_post.user or db.query(models.User).filter(models.User.idUser == db_post.user_id).first()
    return db_post
