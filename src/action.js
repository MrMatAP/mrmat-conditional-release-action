/*
 * MIT License
 *
 * Copyright (c) 2023 MrMat
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

const github = require('@actions/github')
const core = require('@actions/core')

let validateInput = function () {
    return {
        version: core.getInput('version'),
        title: core.getInput('title'),
        token: core.getInput('token'),
        actor: github.context.actor,
        repo: github.context.repo.repo,
        owner: github.context.repo.owner,
        sha: github.context.sha,
        now: (new Date()).toISOString()
    }
}

let releaseAction = async function () {
    //
    // Initialise

    const octokit = github.getOctokit(token)

    //
    // Get identity information about the tagger

    const response = await octokit.request('GET /users/{username}', {
        username: actor,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    core.info(`User Login: ${response.data.login}`)
    core.info(`User Email: ${response.data.email}`)
}

let run = async function() {
    try {
        const input = action.validateInput()
        action.releaseAction()
    } catch(error) {
        core.setFailed(error.message)
    }
}

module.exports = { run, validateInput, releaseAction }
