import * as core from '@actions/core'
import * as path from 'path'
import axios from 'axios'
import util from 'util'
import child_process from 'child_process'
import fs from 'fs'

const exec = util.promisify(child_process.exec)
const access = util.promisify(fs.access)

async function run(): Promise<void> {
  try {
    const gradlew = path.resolve('.', core.getInput('gradlew'))

    await access(gradlew, fs.constants.X_OK)

    core.info(`gradlew executable: ${gradlew}`)

    const gradlewStdout = (await exec(`${gradlew} --version`)).stdout

    core.info(gradlewStdout)

    const version = gradlewStdout.match(/^Gradle (.+)$/m)?.[1]
    const current = (
      await axios.get('https://services.gradle.org/versions/current')
    ).data.version

    core.info(`Project's Gradle version: ${version}`)
    core.info(`Current Gradle version: ${current}`)

    core.setOutput('version', version)
    core.setOutput('current', current)

    if (version !== current) {
      core.setFailed(
        `Project's Gradle version (${version}) differs from current (${current})`
      )
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
