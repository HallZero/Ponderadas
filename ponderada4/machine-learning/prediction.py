import sys
import json
import pandas as pd
import joblib

# Load your trained predictive model (replace 'your_model.pkl' with your model file)
model = joblib.load('./machine-learning/finalized_model.pkl')

# Define a Pydantic model to specify the input data structure
class InputData:
    def __init__(self, subscribers, uploads, video_views_rank,
                 lowest_monthly_earnings, highest_monthly_earnings,
                 lowest_yearly_earnings, highest_yearly_earnings):
        self.subscribers = subscribers
        self.uploads = uploads
        self.video_views_rank = video_views_rank
        self.lowest_monthly_earnings = lowest_monthly_earnings
        self.highest_monthly_earnings = highest_monthly_earnings
        self.lowest_yearly_earnings = lowest_yearly_earnings
        self.highest_yearly_earnings = highest_yearly_earnings

# Read input data from stdin (passed from Node.js)
input_data = json.loads(sys.stdin.read())
input_data = InputData(**input_data)

# Convert the input data to a pandas DataFrame
input_df = pd.DataFrame([input_data.__dict__])

# Preprocess the input data if needed (e.g., one-hot encoding for categorical variables)

# Make predictions using your model
predictions = model.predict(input_df)

# Return the predictions as a dictionary
prediction_dict = {"predictions": predictions.tolist()}  # Assuming your model returns multiple predictions

# Print the predictions (to be captured by Node.js)
print(json.dumps(prediction_dict))
