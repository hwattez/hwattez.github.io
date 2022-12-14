
data: curl python

curl:
	curl 'https://api.archives-ouvertes.fr/search/?q=hugues%20wattez&wt=json&fl=title_s,authFullName_s,conferenceTitle_s,files_s,publicationDateY_i,abstract_s,halId_s,doiId_s,page_s,uri_s&sort=publicationDate_s%20desc' > data/bib.json

python:
	python3 data/groupby_conf.py data/bib.json data/final_bib.json

html: 
	pandoc \
		--metadata-file=data/final_bib.json \
		--from markdown-markdown_in_html_blocks+raw_html \
		--standalone \
		--template _layouts/cv.html \
		md/index.md \
		-o index.html

all: data html