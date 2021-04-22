###Docker 이미지 생성 명령어
##docker 허브 계정이 있는 경우
#docker build -t imhyelim1091/ttmk .
##docker 허브 계정 없는 경우
#docker build .

##Docker 이미지 실행 명령어
#docker run -p 4000:4000 imhyelim1091/ttmk

###코드 변경이 바로 반영되도록 하는 개발환경을 위한 실행 명령어
##docker run -d -p 4000:4000 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app imhyelim1091/ttmk

##컨테이너, 이미지, 네트워크 모두 삭제
#docker system prune

###docker compose로 실행시키기(코드변경 바로 반영O)
#docker-compose up
#포트설정 등은 docker-compose.yml을 수정할것

FROM node:alpine

#Create app directory
WORKDIR /usr/src/app

#Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm install pm2 -g

#Bundle app source
COPY . .

EXPOSE 4000
CMD [ "pm2-runtime", "start", "index.js"];