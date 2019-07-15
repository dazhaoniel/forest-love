import json
import uuid
import hashlib
import pandas as pd
from flask import Flask, request
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
    kg = km*0.166*1.6
    return round(kg, 2)


@app.route('/alive')
def hello():
    return 'Hello World!'


@app.route('/api/v1/location', methods=['GET'])
def get_location():
    name = request.args.get('name')
    df = airports.loc[airports['name'].str.contains(name, case=False) 
    | airports['city'].str.contains(name, case=False)
    | airports['iata'].str.contains(name, case=False)]
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


@app.route('/api/v1/save-records', methods=['POST'])
def add_trip():
    email = request.args.get('email')
    data = json.loads(request.data)['data']
    f = hashlib.md5(email.encode()).hexdigest() if email else 'temp_'+str(uuid.uuid1().hex)
    df = pd.DataFrame.from_dict(data, orient='columns')
    df.to_pickle('data/pickled/users/'+f+'.pkl')
    return ('', 200)


if __name__ == '__main__':
    app.run(debug=True)
