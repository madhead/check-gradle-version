import * as core from '@actions/core'
import axios from 'axios'
import util from 'util'
import {exec as callbackExec} from 'child_process'

const exec = util.promisify(callbackExec)

async function run(): Promise<void> {
  try {
    const gradlew = core.getInput('gradlew')

    const output = await exec(`${gradlew} --version`)

    core.info(output.stdout)
    core.info(output.stderr)

    const current = (
      await axios.get('https://services.gradle.org/versions/current')
    ).data.version

    core.info(`Current Gradle version: ${current}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
