
FROM public.ecr.aws/docker/library/node:20
WORKDIR /app


COPY . ./
RUN npm i

CMD ["npm", "run", "dev"]
