*Class Note by Linne S. Huang. Let me know if you have any comments / suggestions :) <lhuang2@cca.edu> 


# The Performance Measurement & Evaluation

- It's a method to be used in Machine Learning (ML), Natural Language Processing (NLP), Information Retrieval (IR)

- Explain this with an example:

> There's a class with 100 students, 80 males and 20 females.

> _The Classfier_ said: "I am gonna find all the females."

> And he picked 50 people— 20 females + 30 males.

And here we go:

---

### 1. Accuracy (ACC):

- (He picked what he should be picked) + (He didn't picked what he shouldn't be picked) / Total
- (20 + 50) / 100 = 70%

- `Accuracy (ACC) = Σ True positive + Σ True negative / Σ Total population`

- `!Accuracy = Error Rate = 1 - ACC`
 


### 2. Binary Classification:

- Based on Predicted Condition: `Positive` or `Negative`:
- The person is a female: `Positive`
- The person is NOT a female: `Negative`	
- and then, if the real condition is `True` or `False`
	- `True Positive (TP), "Hit"`: Predict she is a female, and is a female
	- `True Negative (TN), "Correct Rejection"`: Predict she is NOT a female, and is NOT a female
	- `False Positive (FP), "False Alarm" (Error Type I)`: Predecit she is a female, but is NOT a female, actually.
	- `False Negative (FN), "Miss" (Error Type II)`: Predict she is NOT a female, but is a female, actually. 

- So— back to the example:
	- `TP` = 20
	- `TN` = 50
	- `FP` = 30
	- `FN` = 0
	- `P` = 20 + 30 = 50
	- `N` = 50 + 0 = 50




### 3. Precision:

> "Your Correct Prediction / All Your Prediction"

- Precision = (Predict is a female) / (All you have predicted) = 20 / 50 = 40%
	
- `Precision (P) = TP / P`


### 4. Recall: 

> "Your Correct Prediction / All the *"correct fact'* "

- Recall = (Predicted is a female) / (Is a female (TP)) + (Is *ACTUALLY* a female (FN)) = 20 / (20 + 0) = 100%

- `Recall (R) = TP / (TP + FN)`


![Precision and Recall by Wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Precisionrecall.svg/350px-Precisionrecall.svg.png)


### 5. Receiver operating characteristic curve (ROC Curve):

- True Positive Rate as X, False Positive Rate as Y

- True Positive Rate (TPR) ("Hit Rate") `TPR = TP / (TP + FN)`

- False Positive Rate (FPR) ("False Alarm Rate") `FPR = FP / (FP + TN)`
 
![ROCcurve](https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/ROC_space-2.png/350px-ROC_space-2.png)

- Based on the example above:
	- TPR = Hit Rate = TP / (TP + FN) = 20 / (20 + 0) = 1
	- FPR = False Alarm Rate = FP / (FP + TN) = 30 / (30 + 50) = 0.375

	- (x, y) = (FPR, TPR) = (0.375, 1)


