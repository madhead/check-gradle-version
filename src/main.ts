import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const gradlew = core.getInput('gradlew')

    core.info(`gradlew: ${gradlew}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
