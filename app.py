import json
import pandas as pd
from flask import Flask, jsonify, request
from geopy import distance


app = Flask(__name__)
airports = pd.read_pickle('data/pickled/airports.pkl')


def get_distance_between_loc(loc1, loc2):
    coords_1 = (airports.iloc[loc1].latitude, airports.iloc[loc1].longitude)
    coords_2 = (airports.iloc[loc2].latitude, airports.iloc[loc2].longitude)
    return distance.distance(coords_1, coords_2).km

def get_carbon(km):
    kg = km*0.227
    return round(kg, 2)

def get_new_records():
    return pd.DataFrame(columns=['start', 'end', 'miles', 'carbon'])

# def save_pickle()

@app.route('/alive')
def hello():
    return 'Hello World!'

@app.route('/api/v1/location', methods=['POST'])
def get_location():
    name = request.args.get('name')
    df = airports.loc[airports['name'].str.contains(name) 
    | airports['city'].str.contains(name)]
    return json.dumps(json.loads(df.reset_index().to_json(orient='records')), indent=2)

@app.route('/api/v1/distances', methods=['POST'])
def get_distances():
    data = json.loads(request.data)['data']
    print(data)
    return 'hello'

@app.route('/api/v1/add-trip', methods=['POST'])
def add_trip():
    row = {'start': request.args.get('start'), 'end': request.args.get('end'), 'miles': request.args.get('miles'), 'carbon': request.args.get('carbon')}
    airports.append(row, ignore_index=True)
    return

@app.route('/api/v1/add-email', methods=['POST'])
def add_email():
    email = request.args.get('email')
    save_pickle(email)
    return


if __name__ == '__main__':
    app.run(debug=True)
