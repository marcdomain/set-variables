# set-variables

Github Action for setting multiple variables dynamically, and also accepts the ternary operator syntax `VARIABLE_NAME: conditional_statement ? true : false`.

## USAGE

### Variables

Variable names are dynamic - you're free to name your variables as you wish. \
Example:

```yaml
- uses: marcdomain/set-variables@v1
    with:
      variables: |
        ENVIRONMENT: "${{ github.ref }}" == "refs/heads/main" ? "production" : "staging"
        USERNAME: 1 > 2 ? "John" : "Doe"
```

> **_NOTE:_**

- Only `string`, `number`, and `boolean` data types are accepted in the conditions/values.
- The maximum number of variables allowed is 10.
- The allowed conditional operators are `<`, `>`, `<=`, `>=`, `<>`, `==`, `!=`, `&&`, `||`

### Resolved variables

- Use `${{ env.ENVIRONMENT }}` and `${{ env.USERNAME }}` respectively to get the variables in subsequent steps of the job.

### Output

- Use the github actions `outputs` property to make the variables available for subsequent jobs in the workflow. See example below:

```sh
jobs:
  Job1:
    runs-on: ubuntu-latest
    name: Job to evaluate variables
    outputs:
      ENVIRONMENT: ${{ env.ENVIRONMENT }}
      USER: ${{ env.USERNAME }}

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: set variables
        uses: marcdomain/set-variables@v1
        with:
          variables: |
            ENVIRONMENT: "${{ github.ref }}" == "refs/heads/main" ? "production" : "staging"
            USERNAME: 1 > 2 ? "John" : "Doe"

      - name: Verify the variables
        run: |
          echo "environment is ${{ env.ENVIRONMENT }}"
          echo "username is ${{ env.USERNAME }}"

  Job2:
    runs-on: ubuntu-latest
    name: Use variables from previous job
    needs: Job1
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Get the output variables
        run: |
          echo "check the USERNAME ${{ needs.Job1.outputs.USER }}"
          echo "check the ENVIRON ${{ needs.Job1.outputs.ENVIRONMENT }}"
```

#### If you would like to buy me coffee ☕️ 😍

https://www.buymeacoffee.com/marcdomain
