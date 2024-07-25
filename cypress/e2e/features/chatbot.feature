Feature: Chatbot 

  Testing features of Chatbot
  #I should have a feature that checks transition to the Documents page
  Background:
    Given I am on the Home Page
    Given My verification status is already approved
    Scenario: Successfully asked Chatbot 
        When I click the "Chatbot" button 
        Then I fill in "Input" with "How do I upload my documents"
        When I press the enter key in S1
        Then I should see a reply "To upload your documents, click on the Document Manager button on the navigation bar at the top of the page. Choose your category and then click the upload or scan button at the top right of the screen. You can then choose the files or scan your files with the device camera. Thank you."

    Scenario: Asked Chatbot invalid question
        When I click the "Chatbot" button 
        Then I fill in "Input" with "qwert"
        When in S2 I press enter
        Then I should see a reply "I'm sorry, I don't understand. Could you please rephrase your question?"


    Scenario: Asked Chatbot question it has not been trained for 
        When I click the "Chatbot" button 
        Then I fill in "Input" with "Where is Tony?"
        When I press the enter key in S3
        Then I should see a reply "I'm sorry, I cannot answer that question. Please click the Community link above to contact us if you would like more assistance."
    
    
    Scenario: Asked Chatbot question in Burmese
        When I click the "Chatbot" button 
        Then I fill in "Input" with "ကျွန်ုပ်၏စာရွက်စာတမ်းများကို မည်သို့တင်ရမည်နည်း။"
        When I press the enter key in S4
        Then I should see a reply "သင့်စာရွက်စာတမ်းများကို အပ်လုဒ်လုပ်ရန်၊ စာမျက်နှာ၏ထိပ်ရှိ လမ်းညွှန်ဘားပေါ်ရှိ စာရွက်စာတမ်းမန်နေဂျာခလုတ်ကို နှိပ်ပါ။ သင့်အမျိုးအစားကို ရွေးချယ်ပြီးနောက် မျက်နှာပြင်၏ ညာဘက်အပေါ်ရှိ အပ်လုဒ်လုပ်ခြင်း သို့မဟုတ် စကင်န်ဖတ်ခြင်းခလုတ်ကို နှိပ်ပါ။ ထို့နောက် သင်သည် ဖိုင်များကို ရွေးချယ်နိုင်သည် သို့မဟုတ် သင့်ဖိုင်များကို စက်ကင်မရာဖြင့် စကင်န်ဖတ်နိုင်သည်။ ကျေးဇူးတင်ပါသည်။" 