export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

REPOSITORY=/home/ec2-user/deploy

cd $REPOSITORY 

npm install prisma@^6.1.0 --save-dev

npm install @prisma/client@^6.1.0

npm run migrate

npm run deploy