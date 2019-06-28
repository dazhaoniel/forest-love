import pandas as pd
from flask import Flask
from geopy import distance


app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/api/v1/location/<name>', methods=['GET'])
def get_location(name):
	return df.loc[df['name'].str.contains(name) 
	| df['city'].str.contains(name)]


def load():
	return pd.read_pickle('data/pickled/airports.pkl')