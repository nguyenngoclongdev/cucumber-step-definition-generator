[![CI](https://github.com/nguyenngoclongdev/cucumber-step-definition-generator/actions/workflows/pipelines.yml/badge.svg)](https://github.com/nguyenngoclongdev/cucumber-step-definition-generator/actions/workflows/pipelines.yml)

![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/nguyenngoclong.cypress-cucumber-step-definition-generator)
![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/nguyenngoclong.cypress-cucumber-step-definition-generator)
![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/nguyenngoclong.cypress-cucumber-step-definition-generator)
![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/nguyenngoclong.cypress-cucumber-step-definition-generator)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/nguyenngoclongdev/cucumber-step-definition-generator/)

# Cucumber Step Definition Generator

This extension is designed to help developers using the testing framework with Gherkin style feature files to generate step definitions more easily and efficiently. With just a few clicks, you can automatically generate step definitions for your feature files, saving you time and reducing the risk of errors.

This extension is maintained by the [Nguyen Ngoc Long](https://github.com/nguyenngoclongdev/).

# Installation

Get it from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.cypress-cucumber-step-definition-generator).

Supported language & framework

<p align="center">
    <!-- JavaScript -->
    <a href="https://github.com/nguyenngoclongdev?tab=repositories" target="_blank">
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
    </a>
    <!-- Typescript -->
    <a href="https://github.com/nguyenngoclongdev?tab=repositories" target="_blank">
        <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
    </a>
</p>
<p align="center">
    <!-- Cypress -->
    <a href="https://github.com/nguyenngoclongdev?tab=repositories" target="_blank">
        <img src="https://img.shields.io/badge/-cypress-49666E?style=for-the-badge&logo=cypress&logoColor=white">
    </a>
    <!-- Cucumberjs -->
    <a href="https://github.com/nguyenngoclongdev?tab=repositories" target="_blank">
        <img src="https://img.shields.io/badge/Cucumber-55BB68?style=for-the-badge&logo=Cucumber&logoColor=white">
    </a>
      <!-- Playwright -->
    <a href="https://github.com/nguyenngoclongdev?tab=repositories" target="_blank">
        <img src="https://img.shields.io/badge/Playwright-314B58?style=for-the-badge&logo=Playwright&logoColor=white">
    </a>
</p>

# Features
-   [Generate step definition](#generate-step-definition) offers multiple options to generate step definitions.
- Automatically detecting various types of information, such as `DataTable`, `DocString`, `int`, `float`, `string`, and other types of information that are supported by **Gherkin Syntax**.
- Additionally, step definitions are de-duplicated when regenerating code, ensuring they remain organized and efficient, even when making changes to your testing scenario.

## Using the extension

You have multiple options when it comes to generating step definitions using this extension:
- The extension can generate the step definition and automatically create a new file for it.
- The extension can generate the step definition and copy it to the clipboard for easy access.
- Alternatively, you can use the Command Palette to generate step definitions directly from within the extension.

### Generate a step definition and create a new file

1. Open any .feature file in vs code editor
2. Right click on the editor and select `Cycucum: Generate step definitions to file`
3. If the file for the step definition doesn't exist, the extension will create it. Otherwise, if the file already exists, the extension will simply append the new step definition to the end of the existing file.

![Generate step definition](images/generate-step-definitions-in-explorer.gif)

### Generate a step definition and copy to clipboard

1. Open any .feature file in vs code editor
2. Right click on the editor and select `Cycucum: Generate step definitions to clipboard`

![Generate step definition](images/generate-step-definitions-to-clipboard.gif)

### Generate step definition from Command Palette

![Generate step definition](images/generate-step-definitions-from-cmd.png)

## Examples

```feature
@web @regression
Feature: Search functionality

    As a user,
    I want to be able to search for products on the website,
    So that I can find what I need quickly and easily.

    Background:
        Given I am on the home page
        And I am logged in as "user@example.com"

    Rule: Search by keyword

        Scenario: Search with a valid keyword
            When I enter "laptop" in the search bar
            And I click the search button
            Then I should see a list of products containing "laptop"
            And the total number of results should be 10

        Scenario Outline: Search with invalid keyword
            When I enter <keyword> in the search bar
            And I click the search button
            Then I should see an error message

            Examples:
                | keyword   |
                | 12345     |
                | $%^&*     |
                | "invalid" |

    Rule: Search by category

        Scenario: Search for a specific category
            When I select "Electronics" from the category dropdown
            And I click the search button
            Then I should see a list of products in the Electronics category
            And the total number of results should be a float value between 10.0 and 20.0

        Scenario Outline: Search with multiple categories
            When I select the following categories:
                | category    |
                | Electronics |
                | Clothing    |
            And I click the search button
            Then I should see a list of products in the selected categories
            And the total number of results should be an integer value

    Rule: Search with filters

        Scenario: Search with filters applied
            When I select "Brand A" from the brand filter
            And I select "Price > $100" from the price filter
            And I click the search button
            Then I should see a list of products that match the applied filters
            And the total number of results should be greater than 0

    Rule: Search with docstring and datatable

        Scenario: Search with advanced options
            When I click the "Advanced Search" link
            And I fill in the following information:
                """
                {
                    "category": "Electronics",
                    "brand": "Brand B",
                    "priceRange": [
                        50,
                        100
                    ],
                    "features": [
                        {
                            "name": "WiFi",
                            "value": "Yes"
                        },
                        {
                            "name": "Bluetooth",
                            "value": "No"
                        }
                    ]
                }
                """
            And I click the search button
            Then I should see a list of products that match the advanced search criteria
            And the total number of results should be a float value

        @smoke
        Scenario: Search withno keyword
            When I click the search button without entering a keyword
            Then I should see the home page with no search results displayed
```

```typescript
import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

Given(`I am on the home page`, () => {
    // The use of 'Given' keyword is to put the system in a familiar state before the user starts interacting with the system.
});

When(`I am logged in as {string}`, (arg0: string) => {
    // Use And, But to combine several steps into one, to make your scenarios easier to read
});

When(`I enter {string} in the search bar`, (arg0: string) => {
    // When the step is to define action performed by the user.
});

When(`I click the search button`, () => {
    // Use And, But to combine several steps into one, to make your scenarios easier to read
});

Then(`I should see a list of products containing {string}`, (arg0: string) => {
    // The use of 'Then' keyword is to see the outcome after the action in when step.
});

When(`the total number of results should be {int}`, (arg0: number) => {
    // Use And, But to combine several steps into one, to make your scenarios easier to read
});

When(`I enter {any} in the search bar`, (arg0: any) => {
    // When the step is to define action performed by the user.
});

Then(`I should see an error message`, () => {
    // The use of 'Then' keyword is to see the outcome after the action in when step.
});

When(`I select {string} from the category dropdown`, (arg0: string) => {
    // When the step is to define action performed by the user.
});

Then(`I should see a list of products in the Electronics category`, () => {
    // The use of 'Then' keyword is to see the outcome after the action in when step.
});

When(`the total number of results should be a float value between {float} and {float}`, (arg0: number, arg1: undefined) => {
    // Use And, But to combine several steps into one, to make your scenarios easier to read
});

When(`I select the following categories:`, (arg0: DataTable) => {
    // Detected argument is an DataTable type
    // - With Column Headers: use datatable.hashes() to read.
    // - With Row Headers: use datatable.rowsHash() to read.
});

Then(`I should see a list of products in the selected categories`, () => {
    // The use of 'Then' keyword is to see the outcome after the action in when step.
});

When(`the total number of results should be an integer value`, () => {
    // Use And, But to combine several steps into one, to make your scenarios easier to read
});

When(`I select {string} from the brand filter`, (arg0: string) => {
    // When the step is to define action performed by the user.
});

When(`I select {string} from the price filter`, (arg0: string) => {
    // Use And, But to combine several steps into one, to make your scenarios easier to read
});

Then(`I should see a list of products that match the applied filters`, () => {
    // The use of 'Then' keyword is to see the outcome after the action in when step.
});

When(`the total number of results should be greater than {int}`, (arg0: number) => {
    // Use And, But to combine several steps into one, to make your scenarios easier to read
});

When(`I click the {string} link`, (arg0: string) => {
    // When the step is to define action performed by the user.
});

When(`I fill in the following information:`, (arg0: string) => {
    // Detected argument is an DocString type
});

Then(`I should see a list of products that match the advanced search criteria`, () => {
    // The use of 'Then' keyword is to see the outcome after the action in when step.
});

When(`the total number of results should be a float value`, () => {
    // Use And, But to combine several steps into one, to make your scenarios easier to read
});

When(`I click the search button without entering a keyword`, () => {
    // When the step is to define action performed by the user.
});

Then(`I should see the home page with no search results displayed`, () => {
    // The use of 'Then' keyword is to see the outcome after the action in when step.
});
```

## Configuration

### Change the default language

You could change the default language to generate:

```json
{
    "cycucum.language": "typescript"
}
```

For the default language: It should be set with language id defined in VS Code. The languages you could set are `javascript`, `typescript`.

### Change the testing framework

```json
{
    "cycucum.runner": "cypress"
}
```

The testing framework you could set are `cypress`, `playwright`, `cucumberjs`.

## Feedback

I hope you find this extension useful for your testing projects, and I welcome any feedback or contributions to help make it even better.

If you discover a bug, or have a suggestion for a feature request, please
submit an [issue](https://github.com/nguyenngoclongdev/cucumber-step-definition-generator/issues).

## LICENSE

This extension is licensed under the [MIT License](LICENSE)
