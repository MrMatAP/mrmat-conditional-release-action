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

//
// Inspired by https://github.com/JasonEtco/build-and-tag-action

const fs = require('fs')
const path = require('path')
const jsYaml = require('js-yaml')

/**
 * Helper that reads the `action.yml` and includes the default values
 * for each input as an environment variable, like the Actions runtime does.
 */
function getDefaultValues() {
    const yaml = fs.readFileSync(path.join(__dirname, '../action.yml'), 'utf8')
    const { inputs } = jsYaml.load(yaml)
    return Object.keys(inputs).reduce(
        (sum, key) => ({
            ...sum,
            [key]: inputs[key].default
        }),
        {}
    )
}

Object.assign(
    process.env,
    {
        GITHUB_ACTION: 'my-action',
        GITHUB_ACTOR: 'MrMatTest',
        // GITHUB_EVENT_NAME: 'release',
        // GITHUB_EVENT_PATH: path.join(__dirname, 'fixtures', 'release.json'),
        GITHUB_REF: 'main',
        GITHUB_REPOSITORY: 'MrMatAP/test',
        GITHUB_SHA: '123abc',
        GITHUB_TOKEN: '456def',
        GITHUB_WORKFLOW: 'my-workflow',
        GITHUB_WORKSPACE: path.join(__dirname, 'fixtures', 'workspace'),
        HOME: '?'
    },
    getDefaultValues()
)