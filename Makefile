deploy:
	yarn build && \
	scp -r dist/ michanya@37.193.13.142:/home/michanya/