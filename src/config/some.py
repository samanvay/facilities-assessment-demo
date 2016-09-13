import sys, json

contents = """ME D5.1|The facility has adequate arrangement storage and supply for portable water in all functional areas
ME D5.2|The facility ensures adequate power backup in all patient care areas as per load
ME D5.3|Critical areas of the facility ensures availability of oxygen, medical gases and vacuum supply"""
contents = contents.split('\n')
contents = map(lambda x: map(lambda y: y.strip(), x.split('|')), contents)
questions = []
for line in contents:
    questions.append({"reference": line[0], "question": line[1]})

print json.dumps(questions)
