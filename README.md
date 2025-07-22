# Template Repository for creating MSL5 Libaries

To use the devcontainer, you must set the `github_user_name` and `github_access_token` ENV Variable within a .env.local file. *DO NOT COMMIT THIS CONTENTS!* This is your private access Token to get Access to the private Repositories Registrie. (Like Dockerhub)

## Migrations

Database migration refers to the structured process of changing a database's schema or moving data between different database systems or versions. This includes creating, modifying, or deleting tables, columns, indexes, and other database objects—often as part of ongoing application development.

Common goals of a migration include:

- Adding new features

- Adapting to changing requirements

- Refactoring the data model

- Switching to a different database system

We do use golang-migrate as a cli tool for automation. 

https://github.com/golang-migrate/migrate/

## Wie baue ich eine vernünftige Libary? 

In go the libary is the code. Any .go File is part of the libary.

### Tests

Tests werden `*_test.go` benannt. Diese Packete werden nicht ausgeliefert, sondern sind nur während des Befehls `go test` relevant.

Example Test Method: 
```go
import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    expected := 5

    if result != expected {
        t.Errorf("Add(2, 3) = %d; want %d", result, expected)
    }
}
```

Bitte vorzugsweise richtige Unittests verwenden. Externe Abhängigkeiten sollten nach Möglichkeit alle gemockt werden. 

### Build Tags

Build tags in Go provide a powerful way to control which parts of your code are included in the final binary. By using build tags, you can easily manage different versions of your application, such as Free, Pro, and Enterprise, without duplicating code or creating separate projects.

Example: 
```go
// +build pro
// +build enterprise

package main

func init() {
features = append(features, "Enterprise Feature #1", "Enterprise Feature #2")
}
```

Build the enterprise version: 

```sh
go build -tags "pro enterprise"
```

Tags are highly customizable.
