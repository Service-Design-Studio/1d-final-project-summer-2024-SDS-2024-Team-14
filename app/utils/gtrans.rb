require 'json'
require 'google_cloud_translate'

# Initialize the Google Translate client
translator = GoogleTranslate.new

# Create a dictionary
dicter = {
# how do i add stuff from the db here...? HELP
}

# Convert the dictionary to a JSON string
json_d = dicter.to_json

# Translate the JSON string to Arabic
translated = translator.translate(json_d, 'ar')

# Convert the translated text back to JSON format
translated_json = JSON.pretty_generate(JSON.parse(translated))

# Print the final JSON output
puts translated_json

# do we need to send this translation to some route?