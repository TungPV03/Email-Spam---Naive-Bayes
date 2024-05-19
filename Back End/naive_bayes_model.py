import numpy as np

class NaiveBayes:
    def fit(self, X, y):
        n_samples, n_features = X.shape
        self._classes = np.unique(y)
        n_classes = len(self._classes)

        self._word_probabilities = np.zeros((n_classes, n_features))

        for i, c in enumerate(self._classes):
            X_c = X[y == c]
            total_word_counts = np.sum(X_c, axis=0)
            total_word_counts_per_class = np.sum(total_word_counts)
            self._word_probabilities[i] = (total_word_counts + 1) / (total_word_counts_per_class + n_features)  #xu ly xac suat = 0

        _, class_counts = np.unique(y, return_counts=True)
        self._class_probabilities = class_counts / len(y)

    def predict(self, X):
        predictions = []
        for x in X:
            sample_probs = []
            for j in range(len(self._classes)):
                sample_prob = np.log(self._class_probabilities[j]) + np.sum(x * np.log(self._word_probabilities[j]))
                sample_probs.append(sample_prob)
            predictions.append(np.argmax(sample_probs))
        return np.array(predictions)
