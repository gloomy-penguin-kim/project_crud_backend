set -e


echo "use admin 

db.createUser({  \
  'user': process.env.DB_USER, \
  'pwd': process.env.DB_PASS,\
  'roles': [ { 'role': 'readWrite','db': process.env.DB_NAME } ]\
});" | mongosh $DB_URI \
        -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD \
        --authenticationDatabase admin 
#mechanisms: [ 'SCRAM-SHA-256' ]\
# echo "--------------------------------------------------------------------------------------"
# MONGO_TOOLS_URL=https://downloads.mongodb.com/compass/mongodb-mongosh_2.3.7_amd64.deb
 
# apt-get update 
# apt-get install vim
 
# wget $MONGO_TOOLS_URL && \
#     apt-get install ./mongodb-database-tools-*.deb && \
#     rm -f mongodb-database-tools-*.deb
# echo "--------------------------------------------------------------------------------------"#

mongorestore  -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD \
              --authenticationDatabase admin --uri=$DB_URI  /data/dump 
