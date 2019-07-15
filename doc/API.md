# Forest Love API

### Locations list based on input

	GET /api/v1/location

Request Parameter:

***name*** (requied) The name of a city or airport code, ie: New York, or JFK

### Distances between two airport codes

	POST /api/v1/distances

Request Body:
```json
{
	"data": [
		{"start": "JFK", "end": "CGD"},
		{"start": "LGA", "end": "YYZ"},
		{"start": "JFK", "end": "PEK"}
    ]
}
```

### Save a list of trips, distances and carbon emission to pickle

	POST /api/v1/save-records

Request Parameter:

***email*** (optional) User's email

Request Body:
```json
{
  "data": [
    {
      "start": "JFK",
      "end": "CGD",
      "kilometer": 12282.909165912788,
      "carbon": 2788.22
    },
    {
      "start": "LGA",
      "end": "YYZ",
      "kilometer": 573.9972408708215,
      "carbon": 130.3
    },
    {
      "start": "JFK",
      "end": "PEK",
      "kilometer": 11003.766135077998,
      "carbon": 2497.85
    }
  ],
  "total_distance": 23860.672541861608,
  "total_carbon": 5416.37
}
```


