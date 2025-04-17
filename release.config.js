// @ts-check
/** @type {import('semantic-release').Options} */
const releaseConfig = {
    branches: [
        'main',
        {
            name: 'next',
            channel: 'next',
            prerelease: true,
        },
    ],
    plugins: [
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md', 'package.json', 'pnpm-lock.yaml'],
                message: 'chore(release): v${nextRelease.version} [skip ci]',
            },
        ],
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
                releaseRules: [
                    { type: 'docs', scope: 'README', release: 'patch' },
                    { type: 'refactor', release: 'patch' },
                    { type: 'style', release: 'patch' },
                    { type: 'test', release: 'patch' },
                    { type: 'ci', release: 'patch' },
                ],
                parserOpts: {
                    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
                },
            },
        ],
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        [
            '@semantic-release/npm',
            {
                npmPublish: false,
            },
        ],
        [
            '@semantic-release/github',
            {
                assets: [
                    'dist/**/*.{js,ts,json}',
                    'CHANGELOG.md',
                    'pnpm-lock.yaml',
                ],
                successComment: false,
                releasedLabels: ['autorelease'],
            },
        ],
        [
            '@semantic-release/exec',
            {
                prepareCmd: 'echo "Preparing release ${nextRelease.version}"',
                publishCmd: 'echo "Publishing release ${nextRelease.version}"',
                successCmd: 'echo "Release ${nextRelease.version} published successfully!"',
            },
        ],
    ],
    tagFormat: 'v${version}',
};

export default {
    ...releaseConfig,
};
