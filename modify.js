module.exports = (f) => {
  f.tippecanoe = {
    layer: f.geometry.type.toLowerCase(),
    minzoom: 12,
    maxzoom: 16
  }

  switch (f.properties._file) {
    case 'codepoint':
      f.properties = {postcode: f.properties.postcode}
      break
    case 'terrain':
      switch (f.properties.feat_type) {
        case 'ContourLine':
          if (f.properties.prop_type % 100 === 0) {
            f.tippecanoe.minzoom = 12
            if (f.properties.prot_type % 400 === 0) {
              f.tippecanoe.minzoom = 10
            }
          }
          break
        case 'SpotHeight':
          break
        case 'LandWaterBoundary':
          if (f.properties.sub_type !== 'meanLowWater') {
            f.tippecanoe.minzoom = 4
          }
          break
        default:
          // console.error(`unknown ${f.properties.f_type}`)
          break
      }
  }

  return f
}
