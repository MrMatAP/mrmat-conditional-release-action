const github = require('@actions/github')
const core = require('@actions/core')

async function run() {
    //
    // Initialise

    const version = core.getInput('version')
    const title = core.getInput('title')
    const token = core.getInput('token')
    const VERSION = process.env.MRMAT_VERSION
    const OWNER = process.env.GITHUB_REPOSITORY_OWNER
    const REPOSITORY = process.env.GITHUB_REPOSITORY.split('/')[1]
    const COMMIT = process.env.GITHUB_SHA
    const now = (new Date()).toISOString()

    const octokit = github.getOctokit(token)

    //
    // Get identity information about the tagger

    const response = await octokit.request('GET /user', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    core.info(response)

}

try {
    core.startGroup('MrMat :: Conditional Release')
    run()

    //
    // Create a tag

    // await octokit.rest.git.createTag({
    //     'owner': OWNER,
    //     'repo': REPOSITORY,
    //     'tag': VERSION,
    //     'message': title,
    //     'object': COMMIT,
    //     'type': 'commit',
    //     'tagger': {
    //         'name': user.name,
    //         'email': user.email,
    //         'date': now
    //     }
    // })

} catch(error) {
    core.setFailed(error.message)
}
