from os import name
from fastapi import FastAPI
from sqlalchemy.sql.functions import user
from db import models
from db.database import engine
from routers import user, post, review
from fastapi.staticfiles import StaticFiles
from auth import authentication
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

app = FastAPI(
  title="Artshoppe Data API",
  description="An ecommerce data api built with FASTAPI and SQLAlchemy",
  version="0.0.1",
)

app.include_router(user.router)
app.include_router(post.router)
app.include_router(review.router)
app.include_router(authentication.router)

@app.get("/", response_class=RedirectResponse)
async def redirect_fastapi():
    return "/docs"


origins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002'
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=['*'],
  allow_headers=['*']
)


models.Base.metadata.create_all(engine)

app.mount('/images', StaticFiles(directory='images'), name='images')