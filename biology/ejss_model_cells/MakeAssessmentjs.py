import json

def buildTask(questionName, description=""):
  task = {
    "name": questionName,
    "description": description,
    "marks": [
      {
        "value": "1",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 1
          }
        ]
      }
    ],
    "events": {
      "start": { "element": "questionLib", "property": "value", "data": {"action":"questionStart","name":questionName} },
      "end": { "element": "questionLib", "property": "value", "data": {"action":"questionEnd","name":questionName} }
    },
    "history": {
      "element": "questionLib",
      "property": "historyFor" + questionName
    } 
  }
  return json.dumps(task)

questionNames = ("Q1","Q2","Q3","Q4","Q5","Q6")

descriptions = (
  "Q1 Does the light ray reach the eye?",
  "Q2 Can the flame be seen by the eye?",
  "Q3 Does the light ray reach the eye?",
  "Q4 Can the flame be seen by the eye?",
  "Q5 Does the light ray reach the eye?",
  "Q6 Can the flame be seen by the eye?"
  
)
print('{"tasks": [')
print(','.join(map(lambda x, y: buildTask(str(x), str(y)), questionNames, descriptions)))
print(']}')
