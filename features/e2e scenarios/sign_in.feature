@sanity_test
  Feature: Sign in Page
    @e2e_test @hpt
    Scenario: Sign in (Happy Path Test)
      Given I'm in sign in page
      And I provide valid TASP user email
      When I click on sign in button
      Then An confirmation mail should be sent to the mail
      When User open and clicks on the login button in confimation mail
      Then It should send an OTP to registered mobile number
      And page should show up to enter OTP
      When User enters the valid OTP
      Then Verify button is clicked automatically
      And It should sign in successfully
      And Dashboard page should showup
      And notification on dashboard saying "Verification Successful"

    Scenario: Invalid OTP
      Given I'm in sign in page
      And I provide valid TASP user email
      When I click on sign in button
      Then An confirmation mail should be sent to the mail
      When User open and clicks on the login button in confimation mail
      Then It should send an OTP to registered mobile number
      And page should show up to enter OTP
      When User enters the invalid OTP
      Then It should show error message "Invalid verification code. Please enter a valid code."

    Scenario: Without email
      Given I'm in sign in page And I didn't provide any email
      When I click on sign in button
      Then It should not sign in And SignIn button should be non clickable And Error message should showup saying "Email is required" in red color near email text box

    Scenario: Incorrect TASP email
      Given I'm in sign in page And I provide invalid TASP user email
      When I click on sign in button
      Then Incorrect should not sign in And SignIn button should be clickable And Error message should showup saying "ACCESS DENIED"