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

questionNames = ("Q1","Q2","Q3","Q4")

descriptions = (
  "challenge 1 target=20",
  "challenge 2 target=25",
  "challenge 3 target=20",
  "user defined"
)
print('{"tasks": [')
print(','.join(map(lambda x, y: buildTask(str(x), str(y)), questionNames, descriptions)))
print(']}')
