import pickle
from flask import Flask, request, jsonify
from naive_bayes_model import NaiveBayes
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from flask_cors import CORS
from sklearn.metrics import precision_score, recall_score, f1_score

app = Flask(__name__)
CORS(app)

# Load and preprocess data
spam_df = pd.read_csv("/Users/phamtung/Email Spam/Back End/spam.csv")
spam_df['spam'] = spam_df['Category'].apply(lambda x: 1 if x == 'spam' else 0)
x_train, x_test, y_train, y_test = train_test_split(spam_df.Message, spam_df.spam, test_size=0.2)
cv = CountVectorizer()
x_train_count = cv.fit_transform(x_train.values)
x_test_count = cv.transform(x_test.values)

# Train model
nb = NaiveBayes()
nb.fit(x_train_count.toarray(), y_train)

# Save the model
with open('naive_bayes_model.pkl', 'wb') as file:
    pickle.dump(nb, file)

@app.route('/predict', methods=['POST'])
def predict_spam():
    # Load model
    with open('naive_bayes_model.pkl', 'rb') as file:
        nb = pickle.load(file)

    # Get email text from request
    email_text = request.json['email']

    # Convert email to count vector
    email_count = cv.transform([email_text])

    # Predict spam or not
    prediction = nb.predict(email_count.toarray())

    # Return prediction result
    if prediction[0] == 1:
        return jsonify({'prediction': 'Spam'})
    else:
        return jsonify({'prediction': 'Not spam'})

@app.route('/metrics', methods=['GET'])
def get_metrics():
    # Load model
    with open('naive_bayes_model.pkl', 'rb') as file:
        nb = pickle.load(file)

    # Predict labels for test data
    predictions = nb.predict(x_test_count.toarray())

    # Calculate metrics
    accuracy = (predictions == y_test).mean()
    precision = precision_score(y_test, predictions)
    recall = recall_score(y_test, predictions)
    f1 = f1_score(y_test, predictions)

    # Return metrics as JSON response
    response = jsonify({
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1_score': f1
    })
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow access from all origins
    return response

if __name__ == '__main__':
    app.run(debug=True)
