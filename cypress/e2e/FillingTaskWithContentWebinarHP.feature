Feature: Filling task content - happy path
  Scenario: Webinar

    Given I navigate to the admin page
    When I visit the landing page and log in as a content guarantor
    When I navigate to "Content" and select "Trainings"
    When I search for the training and click on the training name "G training AAA"
    When I find the task "Webinar" and click "Edit"
    When I fill in "Title"
    When I click on "select a language"
    When I fill in "Instructions for lecturer"
    When I fill in "Instructions for corrector"
    When I fill in "Internal material for lecturer"
    When I fill in "Instructions for student"
    When I fill in "Description"
    When I fill in "Content"
    When I click on button "Upload file"
    Then I click on button "Save"

