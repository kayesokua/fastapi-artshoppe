from datetime import datetime
from sqlalchemy.orm import Session
from db.models import DbReview
from routers.schemas import ReviewBase
import datetime

def create(db: Session, request: ReviewBase):
  new_review = DbReview(
    text = request.text,
    username = request.username,
    post_id = request.post_id,
    timestamp = datetime.datetime.now(),
  )
  db.add(new_review)
  db.commit()
  db.refresh(new_review)
  return new_review

def get_all(db: Session, post_id):
  return db.query(DbReview).filter(DbReview.post_id == post_id).all()