from sqlalchemy.orm.session import Session
from routers.schemas import UserBase, UserDisplay
from fastapi import APIRouter, Depends
from db.database import get_db
from db import db_user
from routers.schemas import UserAuth
from auth.oauth2 import get_current_user

router = APIRouter(
  prefix='/user',
  tags=['user']
)

@router.post('', response_model=UserDisplay)
def create_user(request: UserBase, db: Session = Depends(get_db)):
  return db_user.create_user(db, request)

@router.get('/deactivate/{id}')
def deactivate_user(id: int, db: Session = Depends(get_db), current_user: UserAuth = Depends(get_current_user)):
  return db_user.deactivate_user(db, id, current_user.id)