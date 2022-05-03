# set-variables

Github Action for setting multiple variables dynamically, and also accepts the ternary operator syntax `VARIABLE_NAME: conditional_statement ? true : false`.

## USAGE

### Variables

Variable names are dynamic - you're free to name your variables as you wish. Example:

```yaml
- uses: marcdomain/set-variables@v1
    with:
      variables: |
        ENVIRONMENT: "${{ github.ref }}" == "refs/heads/main" ? "production" : "staging"
        USERNAME: 1 > 2 ? "John" : "Doe"
```

> **_NOTE:_** Only `string`, `number`, and `boolean` data types are accepted in the conditions/values. The maximum number of variables allowed is 10.

### Output

Outputs are the resolved variables. In the example above, you can get the expected values with `${{ env.ENVIRONMENT }}` and `${{ env.USERNAME }}` respectively.

#### If you would like to buy me coffee ☕️ 😍

https://www.buymeacoffee.com/marcdomain
