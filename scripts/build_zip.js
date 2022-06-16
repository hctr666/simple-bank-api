const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const path = require('path')

const FILENAME = 'api.zip'
const API_PATH = path.join(__dirname, '../api')

const buildZip = async () => {
  try {
    console.log('\nPacking zip file...')

    const { stderr, stdout } = await exec(
      `cd ${API_PATH} && zip -r -9 ${FILENAME} . && mv ${FILENAME} ${process.cwd()}/${FILENAME}`
    )

    if (!stderr) {
      console.log(stdout)
      console.log('Zip file created.')
    } else {
      console.error(stderr)
    }
  } catch (error) {
    console.error(error)
  }
}

buildZip()
