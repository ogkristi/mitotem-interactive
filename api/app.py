import os
from pathlib import Path
from flask import Flask, request
from werkzeug.utils import secure_filename
import cv2 as cv

UPLOAD_FOLDER = Path(os.getenv("UPLOAD_FOLDER"))
PUBLIC_FOLDER = Path(os.getenv("PUBLIC_FOLDER"))
ALLOWED_SUFFIXES = os.getenv("ACCEPT_SUFFIX").casefold().split(",")

UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
PUBLIC_FOLDER.mkdir(parents=True, exist_ok=True)

app = Flask(__name__)


def allowed_suffix(filename: str):
    return filename.suffix.casefold() in ALLOWED_SUFFIXES


@app.route("/api/images", methods=["GET"])
def get_workspace():
    files = [
        {"name": f.name, "processed": False}
        for f in UPLOAD_FOLDER.iterdir()
        if allowed_suffix(f)
    ]

    return files, 200


@app.route("/api/images", methods=["POST", "PUT"])
def upload():
    files = request.files.getlist("file")

    for file in files:
        dst = UPLOAD_FOLDER / secure_filename(file.filename)

        if allowed_suffix(dst):
            if not dst.exists():
                file.save(dst)
                dst_web = PUBLIC_FOLDER / dst.with_suffix(".webp").name

                img = cv.imread(str(dst), cv.IMREAD_GRAYSCALE)
                cv.imwrite(str(dst_web), img, [cv.IMWRITE_WEBP_QUALITY, 90])
        else:
            return "", 415

    return "", 201
