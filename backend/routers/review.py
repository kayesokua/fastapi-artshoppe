from routers.schemas import ReviewBase, UserAuth
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_review
from auth.oauth2 import get_current_user
import uuid

router = APIRouter(
  prefix='/review',
  tags=['review']
)

@router.get('/all/{post_id}')
def reviews(post_id, db: Session = Depends(get_db)):
  return db_review.get_all(db, post_id)

@router.post('')
def create(request: ReviewBase, db: Session = Depends(get_db), current_user: UserAuth = Depends(get_current_user)):
  return db_review.create(db, request)

@router.get('/deactivate/{id}')
def delete(id, db: Session = Depends(get_db), current_user: UserAuth = Depends(get_current_user)):
  return db_review.delete(db, id, current_user.id)