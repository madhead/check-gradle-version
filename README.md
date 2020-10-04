# check-gradle-version

Simple Github Action to check that your projects uses the latest stable (AKA "current") Gradle version:

```yml
jobs:
  gradle_version:
    name: Check Gradle version
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
      - uses: madhead/check-gradle-version@v1
```

This action basically ensures that your wrapper uses the same version that is defined at https://services.gradle.org/versions/current.
