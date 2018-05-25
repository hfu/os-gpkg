const config = require('config')
const gpkg = require('@ngageoint/geopackage')
const proj4 = require('proj4')
const fs = require('fs')
const modify = require('./modify.js')

proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs')
const local = proj4('EPSG:27700')

const inverseProject = (geometry, cs) => {
  switch (geometry.type) {
    case 'Point':
      geometry.coordinates = cs.inverse(geometry.coordinates)
      break
    case 'LineString':
      for (let i in geometry.coordinates) {
        geometry.coordinates[i] = cs.inverse(geometry.coordinates[i])
      }
      break
    case 'Polygon':
    case 'MultiLineString':
      for (let i in geometry.coordinates) {
        for (let j in geometry.coordinates[i]) {
          geometry.coordinates[i][j] = cs.inverse(geometry.coordinates[i][j])
        }
      }
      break
    case 'MultiPolygon':
      for (let i in geometry.coordinates) {
        for (let j in geometry.coordinates[i]) {
          for (let k in geometry.coordinates[i][j]) {
            geometry.coordinates[i][j][k] =
              cs.inverse(geometry.coordinates[i][j][k])
          }
        }
      }
      break
    default:
      throw new Error(`${geometry.type} not supported.`)
  }
  return geometry
}

const put = (fr) => {
  if (fr.getGeometry().srsId !== 27700) {
    throw new Error(`srid ${fr.getGeometry().srsId} unknown.`)
  }
  let geometry = inverseProject(fr.getGeometry().geometry.toGeoJSON(), local)
  let properties = fr.values
  delete properties[fr.getGeometryColumn().name]
  let f = modify({
    type: 'Feature',
    geometry: geometry,
    properties: properties
  })
  if (f) console.log(JSON.stringify(f))
}

const dump = (path) => {
  if (!fs.existsSync(path)) throw new Error(`${path} does not exist.`)
  gpkg.GeoPackageManager.open(path, (err, gpkg) => {
    if (err) throw err
    gpkg.getFeatureTables((err, names) => {
      if (err) throw err
      for (const name of names) {
        gpkg.getFeatureDaoWithTableName(name, (err, dao) => {
          if (err) throw err
          dao.queryForEach((err, row, rowDone) => {
            if (err) throw err
            put(dao.getFeatureRow(row))
            rowDone()
          })
        })
      }
    })
  })
}

for (let gpkg of config.get('gpkgs')) {
  dump(`src/${gpkg}`)
}
