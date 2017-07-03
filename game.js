var clientHeight = document.documentElement.clientHeight
var clientWidth = document.documentElement.clientWidth
document.querySelector('main div').style.flexGrow = (clientWidth * 0.8) / clientHeight
var view = document.querySelector('table')
var viewData = new Array(5).fill(new Array(5).fill({}))
viewData.forEach(row => {
  var tableRow = document.createElement('tr')
  row.forEach(cell => {
    tableCell = document.createElement('td')
    tableRow.append(tableCell)
  })
  view.append(tableRow)
})
