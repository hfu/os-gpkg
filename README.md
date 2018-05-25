# os-gpkg-vt

## Download the data
From [OS Open Data Format Trial](http://data-format-trial-osonline.opendata.arcgis.com), download GeoPackage data like the following:

```console
$ mkdir src; cd src
$ curl -C - -O -# https://s3-eu-west-1.amazonaws.com/os-open-data/boundaryline/geopackage/BDLINE_October17.gpkg
$ curl -C - -O -# https://s3-eu-west-1.amazonaws.com/os-open-data/code-point-open/geopackage/CodePoint_Open_February18.gpkg
$ curl -C - -O -# https://s3-eu-west-1.amazonaws.com/os-open-data/os-open-greenspace/geopackage/OPEN_GREENSPACE_October17.gpkg
$ curl -C - -O -# https://s3-eu-west-1.amazonaws.com/os-open-data/os-open-map-local/geopackage/OPENMAP_LOCAL_October17.gpkg
$ curl -C - -O -# https://s3-eu-west-1.amazonaws.com/os-open-data/os-open-names/geopackage/OSOpenNames_Jan18.gpkg
$ curl -C - -O -# https://s3-eu-west-1.amazonaws.com/os-open-data/os-open-rivers/geopackage/OPEN_RIVERS_October17.gpkg
$ curl -C - -O -# https://s3-eu-west-1.amazonaws.com/os-open-data/os-open-roads/geopackage/OPEN_ROADS_October17.gpkg
$ curl -C - -O -# https://s3-eu-west-1.amazonaws.com/os-open-data/os-terrain-50/geopackage/OSTerrain50_Contours.gpkg
$ curl -C - -O -# https://s3-eu-west-1.amazonaws.com/os-open-data/os-vector-map-district/geopackage/VMDVEC_November17.gpkg
$ cd ..
```

Please note that you need a lot of disk space.

## Convert GeoPackage to (NDJSON of) GeoJSON

```console
$ vi config/default.hjson
$ node index.js > os.ndjson
```

## Several statistics
### BDLINE
gpkg 1.1GB

### CodePoint_Open
gpkg 279MB

### OPEN_GREENSPACE
gpkg 104MB

### OPENMAP_LOCAL
gpkg 7.0GB

### OSOpenNames
gpkg 1.9GB

### OPEN_RIVERS
gpkg 167MB

### OPEN_ROADS
gpkg 1.9GB

### OSTerrain50
gpkg 3.0GB

### VMDVEC
gpkg 7.0GB

## Convert (NDJSON of) GeoJSON to vector tiles

```console
$ tippecanoe -f -o os.mbtiles os.ndjson
```

##

# note
The output of this program needs acknowledgement "[Contains OS data © Crown copyright and database right (year)](https://www.ordnancesurvey.co.uk/business-and-government/licensing/using-creating-data-with-os-products/os-opendata.html)"
