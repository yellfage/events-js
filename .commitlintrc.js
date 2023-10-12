module.exports = {
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        // Changes related to build system or external dependencies
        'build',
        // Documentation-related changes (e.g., README, docs folder)
        'docs',
        // A new feature introduced to the codebase
        'feat',
        // A bug fix in the codebase
        'fix',
        // Performance-related improvements or optimizations
        'perf',
        // Code refactoring without adding new features or fixing bugs
        'refactor',
        // Reverting a previous commit
        'revert',
        // Code style changes (e.g., formatting)
        'style',
        // Routine tasks, maintenance, or housekeeping
        'chore',
        // Adding or modifying tests
        'test',
      ],
    ],
  },
}
