Feature: RahulShettyLoginPractise Page

@Negative
  Scenario Outline: Invalid Login
    Given the user Login To Application
    When the user enters "<username>" and "<password>"
    Then UI should show the error message

    Examples:
    |username       |password     |
    |sangar academy |sangaracademy|
    |Another sangar |Ayyadurai      |    

@postive
  Scenario: Select Product
    Given the user Login To Application
    When the user enters grabs username and password from UI
    Then the user should select Product

