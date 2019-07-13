import json
import pandas as pd
from flask import Flask, jsonify, request
from geopy import distance


app = Flask(__name__)
airports = pd.read_pickle('data/pickled/airports.pkl')



def get_distance_between_loc(start, end):
    loc1 = airports.iata[airports.iata == start].index.values.astype(int)[0]
    loc2 = airports.iata[airports.iata == end].index.values.astype(int)[0]
    if not loc1 or not loc2:
        return 0
    coords_1 = (airports.iloc[loc1].latitude, airports.iloc[loc1].longitude)
    coords_2 = (airports.iloc[loc2].latitude, airports.iloc[loc2].longitude)
    return distance.distance(coords_1, coords_2).km


def get_carbon(km):
    kg = km*0.227
    return round(kg, 2)


def get_new_records():
    return pd.DataFrame(columns=['start', 'end', 'kilometer', 'carbon'])


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
    total_distance = 0
    total_carbon = 0
    
    for trip in data:
        km = get_distance_between_loc(trip['start'], trip['end'])
        trip['kilometer'] = km
        trip['carbon'] = get_carbon(km)
        total_distance += km
        total_carbon += trip['carbon']

    return json.dumps({'data': data, 'total_distance': total_distance, 'total_carbon': total_carbon}, indent=2)


@app.route('/api/v1/add-trip', methods=['POST'])
def add_trip():
    # row = {'start': request.args.get('start'), 'end': request.args.get('end'), 'kilometer': request.args.get('miles'), 'carbon': request.args.get('carbon')}
    # airports.append(row, ignore_index=True)
    return


@app.route('/api/v1/add-email', methods=['POST'])
def add_email():
    email = request.args.get('email')
    save_pickle(email)
    return


if __name__ == '__main__':
    app.run(debug=True)
