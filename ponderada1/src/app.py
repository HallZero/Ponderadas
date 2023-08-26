from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


api = FastAPI()
api.mount("/", StaticFiles(directory="static",html = True), name="static")

# Return the index.html from the static folder
@api.get("/")
async def index():
    return FileResponse('static/index.html')