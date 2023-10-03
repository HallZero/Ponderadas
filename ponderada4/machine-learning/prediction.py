from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

# Create a FastAPI application
app = FastAPI()

# Define a Pydantic model to specify the input data structure
class InputData(BaseModel):
    subscribers: int
    # category: str
    uploads: int
    # Country: str
    # channel_type: str
    video_views_rank: int
    lowest_monthly_earnings: float
    highest_monthly_earnings: float
    lowest_yearly_earnings: float
    highest_yearly_earnings: float

# Load your trained predictive model (replace 'your_model.pkl' with your model file)
model = joblib.load('./machine-learning/finalized_model.pkl')

@app.get("/")
def home():
    return "Hello, World!"

# Define the POST route for predictions
@app.post("/predict")
def predict(data: InputData):
    input_data = data.dict()

    # Convert the sample input data to a pandas DataFrame
    input_df = pd.DataFrame([input_data])

    # Preprocess the input data if needed (e.g., one-hot encoding for categorical variables)

    # Make predictions using your model
    predictions = model.predict(input_df)

    # Return the predictions as a dictionary or in any desired format
    return {"predictions": predictions[0]}  # Assuming your model returns a single prediction

# You can add more routes and functionality as needed

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

