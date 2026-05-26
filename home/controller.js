const path = require('path')

const rootDir = require('')

exports.home = async (req, res) => {
    express.static(__dirname + '/static-files-dir')
}