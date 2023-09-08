from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

# Create a FastAPI application
app = FastAPI()

# Define a Pydantic model to specify the input data structure
class InputData(BaseModel):
    subscribers: int
    category: str
    uploads: int
    Country: str
    channel_type: str
    video_views_rank: int
    lowest_monthly_earnings: float
    highest_monthly_earnings: float
    lowest_yearly_earnings: float
    highest_yearly_earnings: float

# Load your trained predictive model (replace 'your_model.pkl' with your model file)
model = joblib.load('finalized_model.pkl')

# Define the POST route for predictions
@app.get("/predict")
def predict(data: InputData):
    # For testing purposes, create a sample input dictionary
    sample_data = {
        "subscribers": 1000000,
        "category": "Entertainment",
        "uploads": 200,
        "Country": "Brazil",
        "channel_type": "Music",
        "video_views_rank": 5,
        "lowest_monthly_earnings": 0.0,
        "highest_monthly_earnings": 5000.0,
        "lowest_yearly_earnings": 0.0,
        "highest_yearly_earnings": 60000.0
    }

    # Convert the sample input data to a pandas DataFrame
    input_df = pd.DataFrame([sample_data])

    # Preprocess the input data if needed (e.g., one-hot encoding for categorical variables)
    # Make sure to match the preprocessing done during model training

    # Make predictions using your model
    predictions = model.predict(input_df)

    # Return the predictions as a dictionary or in any desired format
    return {"predictions": predictions[0]}  # Assuming your model returns a single prediction

# You can add more routes and functionality as needed
