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
      },
      {
        "value": "2",
        "state": [
          {
            "element": "questionLib",
            "property": "awardMarkFor" + questionName,
            "data": 2
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

questionNames = ("Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10")

print('{"tasks": [')
print(','.join(map(lambda x: buildTask(str(x)), questionNames)))
print(']}')