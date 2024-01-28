import os
from pathlib import Path
from flask import Flask, request, send_file
from werkzeug.utils import secure_filename
import cv2 as cv

UPLOAD_FOLDER = Path(os.getenv("UPLOAD_FOLDER")).absolute()
ALLOWED_SUFFIXES = os.getenv("ACCEPT_SUFFIX").casefold().split(",")

UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

app = Flask(__name__)


def allowed_suffix(filename: str):
    return filename.suffix.casefold() in ALLOWED_SUFFIXES


@app.route("/api/images", methods=["PUT"])
def upload():
    file = request.files["file"]
    dst = UPLOAD_FOLDER / secure_filename(file.filename)

    if allowed_suffix(dst):
        if not dst.exists():
            file.save(dst)

        return "", 201  # Created
    else:
        return "", 415  # Unsupported Media Type


@app.route("/api/images/<name>", methods=["GET"])
def download(name: str):
    src = UPLOAD_FOLDER / name

    if src.exists():
        img = cv.imread(str(src), cv.IMREAD_GRAYSCALE)

        dst = UPLOAD_FOLDER / "temp.webp"
        cv.imwrite(str(dst), img, [cv.IMWRITE_WEBP_QUALITY, 90])

        return send_file(dst)
    else:
        return "", 404  # Not Found
