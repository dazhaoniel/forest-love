import pandas as pd
from flask import Flask
from geopy import distance


app = Flask(__name__)


def load():
	return pd.read_pickle('data/pickled/airports.pkl')


def get_distance(loc1, loc2):
	coords_1 = (df.iloc[loc1].latitude, df.iloc[loc1].longitude)
	coords_2 = (df.iloc[loc2].latitude, df.iloc[loc2].longitude)
	return distance.distance(coords_1, coords_2).km


def get_carbon(km):
	kg = km*0.227
	return round(kg, 2)


def get_new_mileages_df():
	return pd.DataFrame(columns=['start', 'end', 'miles', 'carbon'])


def save_pickle()


@app.route('/alive')
def hello():
	return 'Hello World!'


@app.route('/api/v1/location/', methods=['GET'])
def get_location():
	return df.loc[df['name'].str.contains(request.args.get('name')) 
	| df['city'].str.contains(request.args.get('name'))]


@app.route('/api/v1/add-trip', methods=['POST'])
def add_trip():
	row = {'start': request.args.get('start'), 'end': request.args.get('end'), 'miles': request.args.get('miles'), 'carbon': request.args.get('carbon')}
	df.append(row, ignore_index=True)
	return


@app.route('/api/v1/add-email', methods=['POST'])
def add_email():
	email = request.args.get('email')
	save_pickle(email)
	return


