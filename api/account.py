from flask import Flask, Response
import fastai.tabular as fastai
app = Flask(__name__)

CLASSIFIER = fastai.load_learner("../models", "classifier.pkl")

@app.route('/', defaults={'path': ''})
@app.route("/account", metods=["POST", "OPTIONS"])
def classify():
    files = request.files
    account = fastai.open_account("../../data/accounts/account-data")
    prediction = CLASSIFIER.predict(account)
    return {
        "accountPredictions": sorted(
            list(
                zip(
                CLASSIFIER.data.classes,
                [round(x,4) for x in map(float, prediction[2])]
                )
            ),
            ley=lambda p: p[1],
            reverse=True
        )
    } 

def catch_all(path):
    return Response("<h1>Flask on Now</h1><p>You visited: /%s</p>" % (path), mimetype="text/html")