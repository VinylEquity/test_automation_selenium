@sanity_test
  Feature: Treasury Orders
    @e2e_test @hpt1
    Scenario: Create new Treasury Orders with pre signed document (Happy Path Test)
      Given I logged in as TASP And Im in Dashboard Page
      When I expand Issuers from menu
      Then I should be able to see Treasury Orders option in the menu
      When I click on Treasury Orders option
      Then I should be navigated to Treasury Orders page
      And Create new order button is disabled And I should see Select an Issuer Profile
      When I select any Issuer profile from the dropdown
      Then Create new order button should be enabled
      And I should see the list of orders for the issuer selected
      When I click on new order button
      Then I should see the add new order page
      And I enter the Treasury order name And I select issue from the drpdown And Description is disabled
      When I select reason for issuance from the dropdown
      Then Description is enabled
      And I enter the description
      And I select the effective and automatic release date and time
#      And I select the Delivery Method from the dropdown
#      And I select the toggle button Apply 1933 Act Legend to all shares? to NO And I select the toggle button Was board approval required for issuance? to NO
#      When I select the toggle button Upload Pre-Signed Document? to YES
#      Then I should see the upload signed document button
#      When I click on upload signed document button
#      Then I should see the popup with upload button
#      When I click on the upload button
#      Then I should see the popup to upload the file from the system
#      And I upload the pdf file
#      And Once file is uploaded I should see the button to close the popup and to replace the document
#      When I close the popup
#      Then Upload signed document button should be renamed to manage uploaded document
#      And I should see the button to add Recipient
#      When I click on the add recipient button
#      Then A popup should be appeared to add the recipient
#      And Select the holder type from dropdown
#      And enter the all the mandatory details
#      When I click on the save button
#      Then I should see the recipient details added in the list of recipient
#      And I should see the submit button
#      When I click on submit button
#      Then I should see the error message "Please complete Quantity and Price on all rows with red boxes before Saving or Submitting the Order."
#      And I enter the quantity and price
#      When I click on submit button
#      Then I should be redirected to Treasury Order Status page
#      And status should be pending release