import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const token = (core.getInput('github_token') ||
      process.env.GITHUB_TOKEN) as string

    const octokit = new github.GitHub(token)
    const context = github.context

    const ref = core.getInput('ref') || context.ref

    await octokit.git.deleteRef({
      ...context.repo,
      ref
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
