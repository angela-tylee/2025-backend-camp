const TestSequencer = require('@jest/test-sequencer').default

class CustomSequencer extends TestSequencer {
  sort(tests) {
    return tests.sort((testA, testB) => {
      const pathA = testA.path
      const pathB = testB.path

      // Helper to extract priority from test path
      const getPriority = (path) => {
        // 0- folders run first (skills, users, credit packages)
        if (path.includes('/0-')) return 0

        // 1-admin/postCoach runs second (creates coaches)
        if (path.includes('/1-admin/postCoach')) return 1

        // 1-admin/postCourse runs third (creates courses)
        if (path.includes('/1-admin/postCourse')) return 2

        // Other 1-admin tests run fourth
        if (path.includes('/1-admin/')) return 3

        // 1-coaches runs fifth (reads coach data)
        if (path.includes('/1-coaches/')) return 4

        // 2- folders run last
        if (path.includes('/2-')) return 5

        // Everything else
        return 6
      }

      const priorityA = getPriority(pathA)
      const priorityB = getPriority(pathB)

      // If different priorities, sort by priority
      if (priorityA !== priorityB) {
        return priorityA - priorityB
      }

      // Same priority: sort alphabetically by path
      return pathA.localeCompare(pathB)
    })
  }
}

module.exports = CustomSequencer
