import sys
import json

CONF = {
    'conf_int': ['IJCAI', 'ECAI', 'CP', 'ICTAI', 'IEA/AIE', '26th International Conference on Principles and Practice of Constraint Programming'],
    'conf_nat': ['JFPC', 'SEIO', 'ROADEF'],
    'workshops': ['Doctoral Program', 'POS']
} 

def is_it(doc, confs):
    for conf in confs:
        if 'conferenceTitle_s' in doc and conf in doc['conferenceTitle_s']:
            return True

    return False

def compute(raw_data, conf):
    i = 1
    final_data = {
        'conf_int': [],
        'conf_nat': [],
        'workshops': [],
        'others': [],
        'refs': {}
    }


    for doc in raw_data['response']['docs']:
        if is_it(doc, conf['conf_int']):
            doc['n'] = i
            final_data['refs'][doc['halId_s']] = i
            i += 1
            final_data['conf_int'].append(doc)


    for doc in raw_data['response']['docs']:
        if is_it(doc, conf['conf_nat']):
            doc['n'] = i
            final_data['refs'][doc['halId_s']] = i
            i += 1
            final_data['conf_nat'].append(doc)


    for doc in raw_data['response']['docs']:
        if is_it(doc, conf['workshops']):
            doc['n'] = i
            final_data['refs'][doc['halId_s']] = i
            i += 1
            final_data['workshops'].append(doc)


    for doc in raw_data['response']['docs']:
        if not (is_it(doc, conf['conf_int']) or is_it(doc, conf['conf_nat']) or is_it(doc, conf['workshops'])):
            doc['n'] = i
            final_data['refs'][doc['halId_s']] = i
            i += 1
            final_data['others'].append(doc)

    return final_data

src_file = sys.argv[1]
dst_file = sys.argv[2]

with open(src_file, 'r') as file:
    raw_data = json.load(file)

final_data = compute(raw_data, CONF)

with open(dst_file, 'w') as file:
    json.dump(final_data, file, indent=4)