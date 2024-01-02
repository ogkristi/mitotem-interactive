import cv2 as cv
from pathlib import Path
from flask import Flask, request, send_file
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = Path("api").absolute() / "upload"
PUBLIC_FOLDER = Path("public").absolute()
ALLOWED_SUFFIXES = {".tiff", ".tif", ".png"}

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/api/workspace", methods=["GET"])
def get_workspace():
    files = [
        {"name": f.name, "processed": False}
        for f in UPLOAD_FOLDER.iterdir()
        if f.suffix in ALLOWED_SUFFIXES
    ]

    return files, 200


@app.route("/api/upload", methods=["POST", "PUT"])
def upload():
    files = request.files.getlist("filelist")

    for file in files:
        dst = UPLOAD_FOLDER / secure_filename(file.filename)

        if dst.suffix in ALLOWED_SUFFIXES:
            if not dst.exists():
                file.save(dst)
                dst_web = PUBLIC_FOLDER / dst.with_suffix(".webp").name

                img = cv.imread(str(dst), cv.IMREAD_GRAYSCALE)
                cv.imwrite(str(dst_web), img, [cv.IMWRITE_WEBP_QUALITY, 95])
        else:
            return "", 415

    return "", 201
