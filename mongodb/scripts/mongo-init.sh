set -e
 
mongorestore /data/dump 
 
echo "use admin  

db.createUser({  
  'user': process.env.DB_USER, 
  'pwd': process.env.DB_PASS,
  'roles': [  ]
}); 

db.getUsers();

" | mongosh "localhost:27017"   


#mechanisms: [ 'SCRAM-SHA-256' ]\
# echo "--------------------------------------------------------------------------------------"
# MONGO_TOOLS_URL=https://downloads.mongodb.com/compass/mongodb-mongosh_2.3.7_amd64.deb
 
# apt-get update 
# apt-get install vim
 
# wget $MONGO_TOOLS_URL && \
#     apt-get install ./mongodb-database-tools-*.deb && \
#     rm -f mongodb-database-tools-*.deb
# echo "--------------------------------------------------------------------------------------"#
