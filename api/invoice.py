from flask import Flask, Response
import fastai.tabular as fastai
app = Flask(__name__)

CLASSIFIER = fastai.load_learner("../models", "classifier.pkl")

@app.route('/', defaults={'path': ''})
@app.route("/invoice", metods=["POST", "OPTIONS"])
def classify():
    files = request.files
    invoice = fastai.open_account("../../data/invoices/invoice.csv")
    prediction = CLASSIFIER.predict(invoice)
    return {
        "invoicePredictions": sorted(
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