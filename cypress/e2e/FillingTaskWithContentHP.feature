Feature: Filling task content - happy path
  Scenario: Webinar

    Given I navigate to the admin page
    When I visit the landing page and log in as a content guarantor
    When I navigate to Content and select Trainings
    When I search for the training and click on the training name "G training AAA"
    When I find the task "Webinár" and click Edit
    When I fill in Title "Webinár"
    When I click on select a language
    When I fill in Instructions for lecturer
    When I fill in Instructions for corrector
    When I fill in Internal material for lecturer
    When I fill in Instructions for student
    When I fill in Description
    When I fill in Content
    When I click on button Upload file
    Then I click on button Save

  Scenario: Self-study

    Given I navigate to the admin page
    When I visit the landing page and log in as a content guarantor
    When I navigate to Content and select Trainings
    When I search for the training and click on the training name "G training AAA"
    When I find the task "Samoštúdium" and click Edit
    When I fill in Title "Samoštúdium"
    When I click on select a language
    When I fill in Internal material for Content guarantor
    When I fill in Instructions for lecturer
    When I fill in Instructions for corrector
    When I fill in Internal material for lecturer
    When I fill in Instructions for student
    When I fill in Description
    When I fill in Content
    When I click on button Upload file
    Then I click on button Save

  Scenario: Automated test

    Given I navigate to the admin page
    When I visit the landing page and log in as a content guarantor
    When I navigate to Content and select Trainings
    When I search for the training and click on the training name "G training AAA"
    When I find the task "Automatický test" and click Edit
    When I fill in Title "Automatický test"
    When I click on select a language
    When I fill in Instructions for lecturer
    When I fill in Instructions for corrector
    When I fill in Internal material for lecturer
    When I fill in Instructions for student
    When I fill in Description
    When I fill in Content
    When I fill in Questions and answers Automated test
    When I fill the number of questions in the test
    Then I click on button Save

  Scenario: Matching

    Given I navigate to the admin page
    When I visit the landing page and log in as a content guarantor
    When I navigate to Content and select Trainings
    When I search for the training and click on the training name "G training AAA"
    When I find the task "Párovačka" and click Edit
    When I fill in Title "Párovačka"
    When I click on select a language
    When I fill in Instructions for lecturer
    When I fill in Instructions for corrector
    When I fill in Internal material for lecturer
    When I fill in Instructions for student
    When I fill in Description
    When I fill in Content
    When I fill in Matching
    Then I click on button Save
  Scenario: Preference test

    Given I navigate to the admin page
    When I visit the landing page and log in as a content guarantor
    When I navigate to Content and select Trainings
    When I search for the training and click on the training name "G training AAA"
    When I find the task "Preferenčný test" and click Edit
    When I fill in Title "Preferenčný test"
    When I click on select a language
    When I fill in Instructions for lecturer
    When I fill in Instructions for corrector
    When I fill in Internal material for lecturer
    When I fill in Instructions for student
    When I fill in Description
    When I fill in Content
    When I fill in Questions and answers Preference test
    Then I click on button Save

  Scenario: Video Self-study

    Given I navigate to the admin page
    When I visit the landing page and log in as a content guarantor
    When I navigate to Content and select Trainings
    When I search for the training and click on the training name "G training AAA"
    When I find the task "Videosamoštúdium" and click Edit
    When I fill in Title "Videosamoštúdium"
    When I click on select a language
    When I fill in Internal material for Content guarantor
    When I fill in Instructions for lecturer
    When I fill in Instructions for corrector
    When I fill in Internal material for lecturer
    When I fill in Instructions for student
    When I fill in Description
    When I fill in Content
    When I click on button Upload file
    Then I click on button Save

  Scenario: Translate

    Given I navigate to the admin page
    When I visit the landing page and log in as a content guarantor
    When I navigate to Content and select Trainings
    When I search for the training and click on the training name "G training AAA"
    When I find the task "Preklad" and click Edit
    When I fill in Title "Preklad"
    When I click on select a language
    When I fill in Instructions for lecturer
    When I fill in Instructions for corrector
    When I fill in Internal material for lecturer
    When I fill in Instructions for student
    When I fill in Description
    When I fill in Content
    When I fill in Matching Translate
    Then I click on button Save

  Scenario: Questionnaire

    Given I navigate to the admin page
    When I visit the landing page and log in as a content guarantor
    When I navigate to Content and select Trainings
    When I search for the training and click on the training name "G training AAA"
    When I find the task "Anketa" and click Edit
    When I fill in Title "Anketa"
    When I click on select a language
    When I fill in Instructions for lecturer
    When I fill in Instructions for corrector
    When I fill in Internal material for lecturer
    When I fill in Instructions for student
    When I fill in Description
    When I fill in Content
    When I fill in Questions and answers Preference test
    Then I click on button Save