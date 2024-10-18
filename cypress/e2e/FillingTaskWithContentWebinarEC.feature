Feature: Filling task content - edge case
  Scenario: Webinar

    Given I navigate to the admin page
    When I visit the landing page and log in as a content guarantor
    When I navigate to "Content" and select "Trainings"
    When I search for the training and click on the training name "G training AAA"
    When I find the task "Webinar" and click "Edit"
    When I verify that "Title" and "page title" is the same
    When I verify that Checkbox "Use lesson Name" is clickable
    When I verify that "Type" is not empty
    When I verify that "select a language" is clickable
    When I verify that "Duration of student" is enabled
    When I verify that "Duration of corrector" is disabled
    When I verify that "XP points" are not empty
    When I verify that Radio button "DifficultyLevel" is clickable
    When I verify that Select box "Metric category" is enabled
    When I verify that Checkbox "Is Time Limited Task" is clickable
    When I verify that Checkbox "Not mandatory" is clickable
    When I verify that "Author, Content guarantors and Content assistants" are not empty
    When I verify that "Present in trainings" is not empty
    When I verify that "Instructions for student" or "Description" must be filled in
    When I verify that "Lecturers internal material" is required
    When I verify that "Content" is a required field
    When I verify that all required fields have been filled
    When I verify button "Upload file"
    Then I click on button "Save"



