export default function() {
  let urlSlices = this.url.slice(1).split('/')
  this.param = isFinite(urlSlices[1]) ? Number(urlSlices[1]) : urlSlices[1]
  var paramIdx = urlSlices.indexOf(urlSlices[1])
  if (paramIdx !== -1) urlSlices.splice(paramIdx, 1)
  this.url = `/${urlSlices.join('/')}`
  return null
}
