Feature: Creating New Traning

    Creating new traning viac add record button

    Scenario: Create a new traning
    Given Visit the landing page & Log in
    When Navigate to settings of G školenie AAA training
    When Expand all menu items
    When Name: Rating coefficients -> Six inputs are visible and analytical table is available
    When Name: Metrics
    When Name: Time values for accessing - executing - submitting tasks
    When Name: Lesson dates for unmoderated training
    When Name: Task availability dependency
    When Name: Time-limited training - values for submitting tasks
    When Name: Deadlines for evaluating tasks
    When Name: Limits for repeat actions
    When Name: Thresholdy inaktivity
    When Name: Thresholds for lesson duration
    Then Name: The rest